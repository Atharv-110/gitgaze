import InputComp from "@/app/_components/@ui/InputComp";
import ProfileCard from "@/app/_components/card/ProfileCard";

const MainSection: React.FC = () => {
  return (
    <section className="w-full md:w-[700px] flex flex-col gap-10">
      <InputComp />
      <ProfileCard />
    </section>
  );
};

export default MainSection;
