import { Metadata, ResolvingMetadata } from "next";
import BentoComponent from "@/components/bento-component";
import { UserSlugProps } from "@/types/github/github.types";

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
      images: [`/u/${username}/opengraph-image`],
    },
    twitter: {
      card: "summary_large_image",
      images: [`/u/${username}/opengraph-image`],
    },
  };
}

const UserPage = async ({ params }: UserSlugProps) => {
  const { username } = await params;

  return (
    <section className="mt-16 xl:max-w-screen-xl w-full mx-auto py-2">
      <BentoComponent username={username} />
    </section>
  );
};

export default UserPage;
