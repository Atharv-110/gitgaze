import AchievementsCard from "./bento-cards/achievements-card";
import ProfileCard from "./bento-cards/profile-card";
import StreakCard from "./bento-cards/streak-card";

const BentoComponent = ({ username }: { username: string }) => {
  return (
    <div className="grid grid-cols-6 grid-rows-10 gap-4 xl:gap-6">
      <div className="col-span-2 row-span-3">
        <ProfileCard username={username} />
      </div>
      <div className="col-span-3 row-span-4 col-start-1 row-start-4">
        <p className="flex justify-center items-center h-full text-xs text-center border rounded-xl bg-white">
          Coming Soon..
        </p>
      </div>
      <div className="col-span-2 row-span-3 col-start-3 row-start-1">
        <AchievementsCard username={username} />
      </div>
      <div className="col-span-2 row-span-3 col-start-5 row-start-1">
        <StreakCard username={username} />
      </div>
      <div className="col-span-3 row-span-4 col-start-4 row-start-4">
        <p className="flex justify-center items-center h-full text-xs text-center border rounded-xl bg-white">
          Coming Soon..
        </p>
      </div>
      <div className="col-span-2 row-span-3 row-start-8">
        <p className="flex justify-center items-center h-full text-xs text-center border rounded-xl bg-white">
          Coming Soon..
        </p>
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
