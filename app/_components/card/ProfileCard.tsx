import { memo } from "react";
import AvatarComp from "@/app/_components/@ui/AvatarComp";
import ProfileCardHeader from "./sections/ProfileCardHeader";
import ProfileCardMain from "./sections/ProfileCardMain";
import ProfileCardFooter from "./sections/ProfileCardFooter";
import { IData } from "@/app/_interface/iData";

interface IProps {
  data: IData[];
}

const ProfileCard: React.FC<IProps> = (props) => {
  const { data } = props;
  console.log(data)
  return (
    <div className="card">
      <div className="flex justify-between">
        <div className="w-[75px] md:w-[120px] h-fit rounded-full overflow-hidden">
          <AvatarComp />
        </div>
        <div className="w-[calc(100%-90px)] md:w-[calc(100%-150px)]">
          <ProfileCardHeader />
          <div className="hidden lg:block mt-8">
            <ProfileCardMain />
            <ProfileCardFooter />
          </div>
        </div>
      </div>
      <div className="lg:hidden mt-8">
        <ProfileCardMain />
        <ProfileCardFooter />
      </div>
      {/* <div>Hello</div> */}
    </div>
  );
};

export default memo(ProfileCard);
