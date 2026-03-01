import { githubRequest } from "@/lib/githubClient";
import { connectDB } from "@/lib/mongo";
import Users from "@/models/Users";
import { PaginatedAPIResponse } from "@/types/github/github.types";
import { GitGazeUser, GitHubUser } from "@/types/github/user.types";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

const LIMIT = 20;

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const lastViews = searchParams.get("lastViews");
    const lastId = searchParams.get("lastId");
    const allUsers = searchParams.get("allUsers") === "true";
    const sort = searchParams.get("sort") === "desc" ? -1 : 1;
    const userLimit = searchParams.get("limit") || LIMIT;
    let filter: any = {};
    let limit = userLimit ? Number(userLimit) : LIMIT;

    // If NOT allUsers → apply pagination
    if (!allUsers) {
      if (lastViews && lastId) {
        const viewCondition =
          sort === 1 ? { $gt: Number(lastViews) } : { $lt: Number(lastViews) };
        filter = {
          $or: [
            { views: viewCondition },
            {
              views: Number(lastViews),
              _id: { $lt: new mongoose.Types.ObjectId(lastId) },
            },
          ],
        };
      }
    } else {
      // fetch everything at once
      limit = 0;
    }

    const usersQuery = Users.find(filter).sort({ views: sort, _id: -1 }).lean();

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
    let query = `
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
    if (!allUsers) {
      query = `
        query {
          ${usernames
            .map(
              (u, i) => `
                user${i}: user(login: "${u}") {
                  login
                  name
                  avatarUrl
                  isDeveloperProgramMember
                  company
                  followers {
                      totalCount
                  }
                  following {
                      totalCount
                  }
                  status {
                    message
                    emoji
                    emojiHTML
                  }
                }
              `,
            )
            .join("\n")}
        }
      `;
    }

    let result = null;
    if (allUsers) {
      result = await githubRequest<{
        [key: string]: Pick<GitHubUser, "login" | "avatarUrl">;
      }>(query);
    } else {
      result = await githubRequest<{
        [key: string]: GitHubUser;
      }>(query);
    }

    const userdata = result.data
      ? users
          .map((u, i) => {
            const ghUser = (result.data as any)[`user${i}`];
            if (!ghUser) return null;
            return {
              ...ghUser,
              views: u.views,
            };
          })
          .filter(Boolean)
      : [];

    // Cursor only when paginating
    let nextCursor = null;

    if (!allUsers && users.length === LIMIT) {
      const lastUser = users[users.length - 1];
      nextCursor = {
        lastViews: lastUser.views,
        lastId: lastUser._id.toString(),
      };
    }

    if (allUsers) {
      return NextResponse.json<
        PaginatedAPIResponse<
          Pick<GitGazeUser, "login" | "avatarUrl" | "views">[],
          { lastViews: number; lastId: string } | null
        >
      >({
        success: true,
        message: "OK",
        data: userdata as Pick<GitGazeUser, "login" | "avatarUrl" | "views">[],
        nextCursor,
      });
    } else {
      return NextResponse.json<
        PaginatedAPIResponse<
          GitGazeUser[],
          { lastViews: number; lastId: string } | null
        >
      >({
        success: true,
        message: "OK",
        data: userdata as GitGazeUser[],
        nextCursor,
      });
    }
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
