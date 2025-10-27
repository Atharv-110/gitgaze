import AchievementsCard from "./bento-cards/achievements-card";
import ProfileCard from "./bento-cards/profile-card";

const BentoComponent = ({ username }: { username: string }) => {
  return (
    <div className="grid grid-cols-6 grid-rows-10 gap-4 xl:gap-6">
      <div className="col-span-2 row-span-3">
        <ProfileCard username={username} />
      </div>
      <div className="col-span-3 row-span-4 col-start-1 row-start-4"></div>
      <div className="col-span-2 row-span-3 col-start-3 row-start-1">
        <AchievementsCard username={username} />
      </div>
      <div className="col-span-2 row-span-3 col-start-5 row-start-1">4</div>
      <div className="col-span-3 row-span-4 col-start-4 row-start-4">5</div>
      <div className="col-span-2 row-span-3 row-start-8">6</div>
      <div className="col-span-2 row-span-3 col-start-3 row-start-8">7</div>
      <div className="col-span-2 row-span-3 col-start-5 row-start-8">8</div>
    </div>
  );
};

export default BentoComponent;
