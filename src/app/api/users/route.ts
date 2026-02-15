import { githubRequest } from "@/lib/githubClient";
import { connectDB } from "@/lib/mongo";
import Users from "@/models/Users";
import { PaginatedAPIResponse } from "@/types/github/github.types";
import { GitHubUser } from "@/types/github/user.types";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

const LIMIT = 20;

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const lastViews = searchParams.get("lastViews");
    const lastId = searchParams.get("lastId");
    const allUsers = searchParams.get("allUsers");

    let filter: any = {};
    let limit = LIMIT;

    // If NOT allUsers → apply pagination
    if (!allUsers) {
      if (lastViews && lastId) {
        filter = {
          $or: [
            { views: { $lt: Number(lastViews) } },
            {
              views: Number(lastViews),
              _id: { $gt: new mongoose.Types.ObjectId(lastId) },
            },
          ],
        };
      }
    } else {
      // fetch everything at once
      limit = 0;
    }

    const usersQuery = Users.find(filter).sort({ views: -1, _id: 1 }).lean();

    if (!allUsers) {
      usersQuery.limit(limit);
    }

    const users = await usersQuery;

    if (!users.length) {
      return NextResponse.json({
        success: true,
        message: "No users found",
        data: [],
        nextCursor: null,
      });
    }

    const usernames = users.map((u) => u.username);

    // Batch GitHub Query
    const query = `
      query {
        ${usernames
          .map(
            (u, i) => `
              user${i}: user(login: "${u}") {
                login
                avatarUrl
              }
            `,
          )
          .join("\n")}
      }
    `;

    const result = await githubRequest<{
      [key: string]: Pick<GitHubUser, "login" | "avatarUrl">;
    }>(query);

    const userdata = result.data ? Object.values(result.data) : [];

    // Cursor only when paginating
    let nextCursor = null;

    if (!allUsers && users.length === LIMIT) {
      const lastUser = users[users.length - 1];
      nextCursor = {
        lastViews: lastUser.views,
        lastId: lastUser._id.toString(),
      };
    }

    return NextResponse.json<
      PaginatedAPIResponse<
        Pick<GitHubUser, "login" | "avatarUrl">[],
        { lastViews: number; lastId: string }
      >
    >({
      success: true,
      message: "OK",
      data: userdata,
      nextCursor,
    });
  } catch (error) {
    console.error("GitGaze Avatar Pipeline Failed:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Unknown server error",
        data: null,
      },
      { status: 500 },
    );
  }
}
