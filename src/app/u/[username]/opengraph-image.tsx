import { UserSlugProps } from "@/types/github/github.types";
import { loadMontserratFonts } from "@/lib/og-fonts";
import { ImageResponse } from "next/og";
import { GitHubUser } from "@/types/github/user.types";

export const runtime = "edge";

export const contentType = "image/png";
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://www.gitgaze.dev";
const fonts = await loadMontserratFonts();
const OGProps = {
  width: 1200,
  height: 630,
  fonts: fonts.map((font) => ({
    ...font,
    weight: String(font.weight) as any,
  })),
};
export default async function OG({ params }: UserSlugProps) {
  const { username } = await params;

  const res = await fetch(`${BASE_URL}/api/github/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ login: username }),
    next: { revalidate: 60 * 60 },
  });

  if (!res.ok) {
    return DefaultOG();
  }
  const json = await res.json();
  const user = json.data as GitHubUser;

  return new ImageResponse(
    <div
      style={{
        width: OGProps.width,
        height: OGProps.height,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: -24,
          left: -24,
          width: 300,
          height: 300,
          borderRadius: "50%",
          filter: "blur(75px)",
          background:
            "linear-gradient(to bottom, rgba(168, 85, 247, 0.6), rgba(196, 181, 253, 1))",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -24,
          right: -24,
          width: 300,
          height: 300,
          borderRadius: "50%",
          filter: "blur(75px)",
          background:
            "linear-gradient(to bottom, rgba(59, 130, 246, 0.6), rgba(191, 219, 254, 1))",
        }}
      />
      {/* Header */}
      <div tw="flex items-center justify-between max-h-24 w-full px-8 py-4">
        <div tw="flex items-center">
          <div tw="flex items-center justify-center p-2 bg-black rounded-lg">
            <img
              src={`${BASE_URL}/gitgaze_logo.png`}
              alt="GitGaze Logo"
              tw="w-10"
            />
          </div>
          <h1
            tw="ml-2 font-bold text-4xl leading-none"
            style={{
              backgroundImage: "linear-gradient(135deg, #c27aff, #2b7fff)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            GitGaze
          </h1>
        </div>
        <p tw="text-lg text-black">Your GitHub, Reimagined 🔮</p>
      </div>
      {/* User Info */}
      <div tw="flex flex-col flex-1 px-8 pb-8 pt-2">
        <div tw="w-full h-full p-5 flex border border-slate-300 rounded-xl bg-gray-300/20 shadow-lg">
          <div tw="flex flex-col justify-center w-full items-center">
            <img
              src={user.avatarUrl}
              alt={`${user.login}'s avatar`}
              tw="w-50 h-50 rounded-full border-4 border-slate-100 shadow-lg"
            />
            <h1
              tw="text-5xl font-bold tracking-wide m-0 mt-4"
              style={{
                backgroundImage: "linear-gradient(135deg, #c27aff, #2b7fff)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              {user.name}
            </h1>
            <p tw="w-3/4 text-slate-800 text-center m-0 mt-4">{user.bio}</p>
            <div tw="flex items-center justify-center py-3 px-5 bg-black text-white rounded-xl m-0 mt-5">
              gitgaze.dev/u/{user.login}
            </div>
          </div>
        </div>
      </div>
    </div>,
    OGProps,
  );
}

function DefaultOG() {
  return new ImageResponse(
    <img src={`${BASE_URL}/opengraph-image.jpg`} alt="OG Image" />,
    OGProps,
  );
}
