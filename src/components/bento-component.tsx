import AchievementsCard from "./bento-cards/achievements-card";
import AllLanguages from "./bento-cards/all-languages";
import ContributionGraph from "./bento-cards/contribution-graph";
import ProfileCard from "./bento-cards/profile-card";
import StreakCard from "./bento-cards/streak-card";
import TopLanguages from "./bento-cards/top-languages";
import TopRepos from "@/components/bento-cards/top-repos";

const BentoComponent = ({ username }: { username: string }) => {
  return (
    <div className="h-full grid grid-cols-6 grid-rows-10 gap-4 xl:gap-4">
      <div className="col-span-2 row-span-3">
        <ProfileCard username={username} />
      </div>
      <div className="col-span-2 row-span-4 col-start-2 row-start-4">
        <TopLanguages username={username} />
      </div>
      <div className="col-span-1 row-span-4 col-start-1 row-start-4">
        <AllLanguages username={username} />
      </div>
      <div className="col-span-2 row-span-3 col-start-3 row-start-1">
        <AchievementsCard username={username} />
      </div>
      <div className="col-span-2 row-span-3 col-start-5 row-start-1">
        <StreakCard username={username} />
      </div>
      <div className="col-span-3 row-span-4 col-start-4 row-start-4">
        <ContributionGraph username={username} />
      </div>
      <div className="col-span-2 row-span-3 row-start-8">
        <TopRepos username={username} />
      </div>
      <div className="col-span-2 row-span-3 col-start-3 row-start-8">
        <p className="flex justify-center items-center h-full text-xs text-center border rounded-xl bg-white">
          Coming Soon..
        </p>
      </div>
      <div className="col-span-2 row-span-3 col-start-5 row-start-8">
        <p className="flex justify-center items-center h-full text-xs text-center border rounded-xl bg-white">
          Coming Soon..
        </p>
      </div>
    </div>
  );
};

export default BentoComponent;
