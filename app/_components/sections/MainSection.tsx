import InputComp from "@/app/_components/@ui/InputComp";
import ProfileCard from "@/app/_components/card/ProfileCard";
import TypographyComp from "../@ui/TypographyComp";

const MainSection: React.FC = () => {
  return (
    <section className="w-full md:w-[760px] flex flex-col gap-12">
      <TypographyComp variant="title" text="GitGaze"/>
      <InputComp />
      <ProfileCard />
    </section>
  );
};

export default MainSection;
