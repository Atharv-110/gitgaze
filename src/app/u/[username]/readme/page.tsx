import Integrations from "@/components/integration";
import ReadmeRenderer from "@/components/readme-renderer";
import { Route } from "@/enums/route.enum";
import { detectHolopin } from "@/lib/client.helpers";
import { UserSlugProps } from "@/types/github/github.types";
import { IntegrationComponentProps } from "@/types/integration/integration.types";
import { constructMetadata } from "@/utils/metadata";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: UserSlugProps): Promise<Metadata> {
  const { username } = await params;
  const lowercasedUsername = username.toLowerCase();

  return constructMetadata({
    title: lowercasedUsername + " at GitGaze",
    description: `Explore ${lowercasedUsername}’s README with special integrations like holopin badges`,
    canonicalUrl: Route.USER_README(username),
    image: Route.OPENGRAPH_IMAGE(username),
  });
}

async function getReadmeByUsername(username: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/github/user/repositories/profile`,
    {
      method: "POST",
      body: JSON.stringify({ login: username }),
    },
  );

  const json = await res.json();
  return json.data as string;
}

const UserReadmePage = async ({ params }: UserSlugProps) => {
  const { username } = await params;
  const readme = await getReadmeByUsername(username);

  const holopinUsername = detectHolopin(readme);
  const integrationProps: IntegrationComponentProps = {
    holopinUsername,
  };

  return (
    <section
      className={`max-w-screen-xl h-fit w-full mx-auto py-2 flex flex-col md:flex-row items-start gap-2 ${holopinUsername ? "justify-normal" : "justify-center"}`}
    >
      <ReadmeRenderer username={username} readme={readme} />

      <div className="w-full flex-1 space-y-2">
        <Integrations {...integrationProps} />
      </div>
    </section>
  );
};

export default UserReadmePage;
