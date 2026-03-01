import LeaderBoardLineChart from "@/components/leaderboard-line-chart";
import UsersComponent from "@/components/users-component";

const DiscoverPage = () => {
  return (
    <section className="md:max-w-screen-xl w-full mx-auto py-2 space-y-2">
      <LeaderBoardLineChart />
      <UsersComponent />
    </section>
  );
};

export default DiscoverPage;
