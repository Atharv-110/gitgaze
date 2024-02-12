import TypographyComp from "@/app/_components/@ui/TypographyComp";

const ProfileCardHeader: React.FC = () => {
  return (
    <div className="flex flex-col gap-y-3 lg:flex-row items-baseline justify-between text-lg">
      <div className="flex flex-col gap-2">
        <TypographyComp variant="title" text="The Octocat" />
        <TypographyComp
          variant="link"
          text="Thelink"
          url="https://github-user-search-app-gold.vercel.app/"
        />
        <div className="hidden lg:block">
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
