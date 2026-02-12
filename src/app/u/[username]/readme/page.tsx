import ReadmeRenderer from "@/components/readme-renderer";
import { UserSlugProps } from "@/types/github/github.types";

const UserReadmePage = async ({ params }: UserSlugProps) => {
  const { username } = await params;

  return (
    <section className="mt-16 max-w-screen-lg w-full mx-auto py-2">
      <h1 className="text-2xl font-bold mb-4">@{username}'s README</h1>
      <ReadmeRenderer username={username} />
    </section>
  );
};

export default UserReadmePage;
