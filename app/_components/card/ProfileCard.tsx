import AvatarComp from "@/app/_components/@ui/AvatarComp";
import ProfileCardHeader from "./sections/ProfileCardHeader";
import ProfileCardMain from "./sections/ProfileCardMain";
import ProfileCardFooter from "./sections/ProfileCardFooter";
// import { IData } from "@/app/_interface/iData";

interface IProps {
  image: string | null;
  name: string;
  username: string;
  url: string;
  bio: string | null;
  // data: IData[];
}

const ProfileCard: React.FC<IProps> = (props) => {
  const { image, name, username, url, bio } = props;
  return (
    <div className="card">
      <div className="flex justify-between">
        <div className="w-[75px] md:w-[120px] h-fit rounded-full overflow-hidden">
          <AvatarComp image={image} />
        </div>
        <div className="w-[calc(100%-90px)] md:w-[calc(100%-150px)]">
          <ProfileCardHeader
            name={name}
            username={username}
            url={url}
            bio={bio}
          />
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

export default ProfileCard;
