import BentoComponent from "@/components/bento-component";
import { Route } from "@/enums/route.enum";
import { UserSlugProps } from "@/types/github/github.types";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: UserSlugProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { username } = await params;
  const lowercasedUsername = username.toLowerCase();
  const userUrl = `${process.env.NEXT_PUBLIC_APP_URL || "https://www.gitgaze.dev"}/u/${lowercasedUsername}`;

  return {
    title: lowercasedUsername,
    description: `Discover ${lowercasedUsername}’s GitHub statistics and activity in a personalized, visual, and share-ready dashboard — highlighting their achievements, contributions, and developer journey.`,
    alternates: {
      canonical: userUrl,
    },
    openGraph: {
      images: [Route.OPENGRAPH_IMAGE(username)],
    },
    twitter: {
      card: "summary_large_image",
      images: [Route.OPENGRAPH_IMAGE(username)],
    },
  };
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
