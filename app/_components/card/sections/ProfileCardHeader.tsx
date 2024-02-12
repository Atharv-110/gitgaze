import TypographyComp from "@/app/_components/@ui/TypographyComp";

const ProfileCardHeader: React.FC = () => {
  return (
    <div className="flex flex-col gap-y-1 lg:flex-row items-baseline justify-between text-lg">
      <div className="flex flex-col">
        <TypographyComp variant="title" text="The Octocat" />
        <TypographyComp
          variant="link"
          text="Thelink"
          url="https://github-user-search-app-gold.vercel.app/"
        />
        <div className="hidden lg:block mt-2">
          <TypographyComp variant="subtitle" text="This profile has no bio" />
        </div>
      </div>
      <div>
        <TypographyComp variant="date" text="Joined 26 Jan 2011" />
      </div>
    </div>
  );
};

export default ProfileCardHeader;
