import TypographyComp from "../../@ui/TypographyComp";

interface IProps {
  followers: number;
  following: number;
  repos: number;
}

const ProfileCardMain: React.FC<IProps> = (props) => {
  const { followers, following, repos } = props;
  return (
    <div className="bg-white-dull py-4 flex justify-around rounded-lg">
      <div>
        <TypographyComp variant="date" text="Repos" />
        <TypographyComp variant="title" text={repos} />
      </div>
      <div>
        <TypographyComp variant="date" text="Followers" />
        <TypographyComp variant="title" text={followers} />
      </div>
      <div>
        <TypographyComp variant="date" text="Following" />
        <TypographyComp variant="title" text={following} />
      </div>
    </div>
  );
};

export default ProfileCardMain;
