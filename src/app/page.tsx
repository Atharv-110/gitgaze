import { AuroraText } from "@/components/ui/aurora-text";
import { AvatarCircles } from "@/components/ui/avatar-circles";
import CustomInput from "@/components/ui/custom-input";
import { GitHubUser } from "@/types/github/user.types";

async function getUsers() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users`, {
    next: { revalidate: 300 },
  });

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
                  imageUrl: user.avatarUrl,
                  profileUrl: `/u/${user.login}`,
                };
              })}
          />
          <p className="text-xs md:text-sm ml-1">being gazed</p>
        </div>
      )}
    </section>
  );
}
