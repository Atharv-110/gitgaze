import BentoComponent from "@/components/bento-component";
import { Route } from "@/enums/route.enum";
import { UserSlugProps } from "@/types/github/github.types";
import { constructMetadata } from "@/utils/metadata";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: UserSlugProps): Promise<Metadata> {
  const { username } = await params;
  const lowercasedUsername = username.toLowerCase();

  return constructMetadata({
    title: lowercasedUsername + " at GitGaze",
    description: `Discover ${lowercasedUsername}’s GitHub statistics and activity in a personalized, visual, and share-ready dashboard — highlighting their achievements, and contributions.`,
    canonicalUrl: `/u/${lowercasedUsername}`,
    image: Route.OPENGRAPH_IMAGE(lowercasedUsername),
  });
}

const UserPage = async ({ params }: UserSlugProps) => {
  const { username } = await params;

  return (
    <section className="max-w-screen-xl w-full mx-auto py-2">
      <BentoComponent username={username} />
    </section>
  );
};

export default UserPage;
