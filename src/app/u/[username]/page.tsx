import { Metadata, ResolvingMetadata } from "next";
import BentoComponent from "@/components/bento-component";

type Props = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { username } = await params;
  const lowercasedUsername = username.toLowerCase();

  return {
    title: lowercasedUsername,
    description: `Discover ${lowercasedUsername}’s GitHub statistics and activity in a personalized, visual, and share-ready dashboard — highlighting their achievements, contributions, and developer journey.`,
    alternates: {
      canonical: `/u/${username}`,
    },
  };
}

const UserPage = async ({ params }: Props) => {
  const { username } = await params;

  return (
    <section className="mt-16 xl:max-w-screen-xl w-full mx-auto">
      <BentoComponent username={username} />
    </section>
  );
};

export default UserPage;
