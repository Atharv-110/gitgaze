import { AuroraText } from "@/components/ui/aurora-text";
import { AvatarCircles } from "@/components/ui/avatar-circles";
import CustomInput from "@/components/ui/custom-input";
import { getGithubAvatar } from "@/lib/client.helpers";
import { GitHubUser } from "@/types/github/user.types";
import Image from "next/image";
import Link from "next/link";

async function getUsers() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/users?sort=desc&limit=0`,
    {
      next: { revalidate: 300 },
    },
  );

  if (!res.ok) return [];

  const data = await res.json();

  return data;
}

export default async function Home() {
  const { data }: { data: Pick<GitHubUser, "login" | "avatarUrl">[] } =
    await getUsers();
  return (
    <section className="mx-auto flex flex-col items-center justify-center space-y-8">
      <div className="text-center">
        <p className="font-semibold text-lg lg:text-2xl">Your GitHub</p>
        <h1 className="font-extrabold text-4xl lg:text-5xl xl:text-6xl">
          Reimagined with <AuroraText>GitGaze</AuroraText>
        </h1>
      </div>
      <CustomInput />
      {data && (
        <div className="flex items-center ">
          <AvatarCircles
            numPeople={data.length > 6 ? data.length - 6 : 0}
            avatarUrls={data
              .slice(0, 6)
              .map((user: Pick<GitHubUser, "login" | "avatarUrl">) => {
                return {
                  imageUrl: getGithubAvatar(user.avatarUrl, 80),
                  profileUrl: user.login,
                };
              })}
          />
          <p className="text-xs md:text-sm ml-1">being gazed</p>
        </div>
      )}
      <Link
        href="https://www.producthunt.com/products/gitgaze?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-gitgaze"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          alt="GitGaze - Your GitHub, Reimagined with GitGazeGitGaze 🔮 | Product Hunt"
          width="200"
          height="100"
          className="w-44"
          src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1064536&amp;theme=light&amp;t=1769292319040"
        />
      </Link>
    </section>
  );
}
