import AvatarComp from "@/app/_components/@ui/AvatarComp";
import ProfileCardHeader from "./sections/ProfileCardHeader";
import ProfileCardMain from "./sections/ProfileCardMain";
import ProfileCardFooter from "./sections/ProfileCardFooter";
import { IData } from "@/app/_interface/iData";
import TypographyComp from "../@ui/TypographyComp";

interface IProps extends IData {}

const ProfileCard: React.FC<IProps> = (props) => {
  const {
    avatar_url,
    bio,
    blog,
    company,
    created_at,
    followers,
    following,
    html_url,
    location,
    login,
    name,
    public_repos,
    twitter_username,
  } = props;
  const date = new Date(created_at);
  const newDate = date
    .toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
    .replace(",", "");
  return (
    <div className="card">
      <div className="flex justify-between">
        <div className="w-[75px] md:w-[120px] h-fit rounded-full overflow-hidden">
          <AvatarComp image={avatar_url} />
        </div>
        <div className="w-[calc(100%-90px)] md:w-[calc(100%-150px)]">
          <ProfileCardHeader
            name={name}
            username={login}
            url={html_url}
            bio={bio}
            date={newDate}
          />
          <div className="hidden lg:block mt-8">
            <ProfileCardMain
              followers={followers}
              following={following}
              repos={public_repos}
            />
            <ProfileCardFooter
              twitter_username={twitter_username}
              blog={blog}
              location={location}
              company={company}
            />
          </div>
        </div>
      </div>
      <div className="lg:hidden mt-4 px-1">
        <TypographyComp variant="subtitle" text={bio ?? "This profile has no bio"} />
      </div>
      <div className="lg:hidden mt-4">
        <ProfileCardMain
          followers={followers}
          following={following}
          repos={public_repos}
        />
        <ProfileCardFooter
          twitter_username={twitter_username}
          blog={blog}
          location={location}
          company={company}
        />
      </div>
      {/* <div>Hello</div> */}
    </div>
  );
};

export default ProfileCard;
