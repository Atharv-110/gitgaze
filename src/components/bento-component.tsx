import AchievementsCard from "./bento-cards/achievements-card";
import ActiveDays from "./bento-cards/active-days";
import AllLanguages from "./bento-cards/all-languages";
import ContributionGraph from "./bento-cards/contribution-graph";
import ProfileCard from "./bento-cards/profile-card";
import StreakCard from "./bento-cards/streak-card";
import TopLanguages from "./bento-cards/top-languages";
import TopRepos from "@/components/bento-cards/top-repos";

const BentoComponent = ({ username }: { username: string }) => {
  return (
    // <div className="h-full grid grid-cols-6 grid-rows-10 gap-4 xl:gap-5 pb-2">
    //   <div className="col-span-2 row-span-3">
    //     <ProfileCard username={username} />
    //   </div>
    //   <div className="col-span-2 row-span-4 col-start-2 row-start-4">
    //     <TopLanguages username={username} />
    //   </div>
    //   <div className="col-span-1 row-span-4 col-start-1 row-start-4">
    //     <AllLanguages username={username} />
    //   </div>
    //   <div className="col-span-2 row-span-3 col-start-3 row-start-1">
    //     <AchievementsCard username={username} />
    //   </div>
    //   <div className="col-span-2 row-span-3 col-start-5 row-start-1">
    //     <StreakCard username={username} />
    //   </div>
    //   <div className="col-span-3 row-span-4 col-start-4 row-start-4">
    //     <ContributionGraph username={username} />
    //   </div>
    //   <div className="col-span-2 row-span-3 row-start-8">
    //     <ActiveDays username={username} />
    //   </div>
    //   <div className="col-span-2 row-span-3 col-start-3 row-start-8">
    //     <TopRepos username={username} />
    //   </div>
    //   <div className="col-span-2 row-span-3 col-start-5 row-start-8">
    //     <p className="flex justify-center items-center h-full text-xs text-center border rounded-xl bg-white">
    //       Coming Soon..
    //     </p>
    //   </div>
    // </div>
    <div
      className="
    h-full 
    grid gap-4 xl:gap-5 pb-2
    grid-cols-1 auto-rows-auto
    md:grid-cols-6 md:grid-rows-10
  "
    >
      {/* Profile Card */}
      <div className="md:col-span-2 md:row-span-3">
        <ProfileCard username={username} />
      </div>

      {/* Top Languages */}
      <div className="md:col-span-2 md:row-span-4 md:col-start-2 md:row-start-4">
        <TopLanguages username={username} />
      </div>

      {/* All Languages */}
      <div className="md:col-span-1 md:row-span-4 md:col-start-1 md:row-start-4">
        <AllLanguages username={username} />
      </div>

      {/* Achievements */}
      <div className="md:col-span-2 md:row-span-3 md:col-start-3 md:row-start-1">
        <AchievementsCard username={username} />
      </div>

      {/* Streak Card */}
      <div className="md:col-span-2 md:row-span-3 md:col-start-5 md:row-start-1">
        <StreakCard username={username} />
      </div>

      {/* Contribution Graph */}
      <div className="md:col-span-3 md:row-span-4 md:col-start-4 md:row-start-4">
        <ContributionGraph username={username} />
      </div>

      {/* Active Days */}
      <div className="md:col-span-2 md:row-span-3 md:row-start-8">
        <ActiveDays username={username} />
      </div>

      {/* Top Repos */}
      <div className="md:col-span-2 md:row-span-3 md:col-start-3 md:row-start-8">
        <TopRepos username={username} />
      </div>

      {/* Coming Soon */}
      <div className="md:col-span-2 md:row-span-3 md:col-start-5 md:row-start-8">
        <p className="flex justify-center items-center h-full text-xs text-center border rounded-xl bg-white">
          Coming Soon..
        </p>
      </div>
    </div>
  );
};

export default BentoComponent;
