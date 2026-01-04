import { connectDB } from "@/lib/mongo";
import { getUserCreatedAtDate } from "@/lib/server.helpers";
import Users from "@/models/Users";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username } = await req.json();

    const userCreatedAt = await getUserCreatedAtDate(username);

    if (!userCreatedAt) {
      return NextResponse.json({ success: false }, { status: 500 });
    }
    await connectDB();

    await Users.findOneAndUpdate(
      { username },
      { $inc: { views: 1 }, $setOnInsert: { username } },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("GitGaze Visit Track Failed:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
