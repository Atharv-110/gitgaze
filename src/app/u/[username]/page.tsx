import BentoComponent from "@/components/bento-component";
import { Metadata, ResolvingMetadata } from "next";
import React from "react";

type Props = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { username } = await props.params;
  const lowercasedUsername = username.toLowerCase();
  return {
    title: lowercasedUsername,
    description: `Discover ${lowercasedUsername}’s GitHub statistics and activity in a personalized, visual, and share-ready dashboard — highlighting their achievements, contributions, and developer journey.`,
    alternates: {
      canonical: `/u/${username}`,
    },
  };
}

const UserPage = async (props: Props) => {
  const { username } = await props.params;
  return (
    <section className="mt-16 xl:max-w-screen-xl w-full mx-auto">
      <BentoComponent username={username} />
    </section>
  );
};

export default UserPage;
