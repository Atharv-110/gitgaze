import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const match = pathname.match(/^\/u\/([^/]+)/);

  if (!match) return NextResponse.next();

  const username = match[1];

  // fetch(`${req.nextUrl.origin}/api/track-user`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ username }),
  // }).catch((err) => {
  //   console.error("GitGaze User Tracking Failed:", err);
  // });

  return NextResponse.next();
}

export const config = {
  matcher: ["/u/:path"],
};
