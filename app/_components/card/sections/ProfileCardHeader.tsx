import TypographyComp from "@/app/_components/@ui/TypographyComp";

interface IProps {
  name: string,
  username: string,
  url: string,
  bio: string | null
}

const ProfileCardHeader: React.FC<IProps> = (props) => {
  const  { name, username, url, bio } = props;
  return (
    <div className="flex flex-col gap-y-1 lg:flex-row items-baseline justify-between text-lg">
      <div className="flex flex-col">
        <TypographyComp variant="title" text={name}  />
        <TypographyComp
          variant="link"
          text={username}
          url={url}
        />
        <div className="hidden lg:block mt-2">
          <TypographyComp variant="subtitle" text={bio ?? "This profile has no bio"} />
        </div>
      </div>
      <div>
        <TypographyComp variant="date" text="Joined 26 Jan 2011" />
      </div>
    </div>
  );
};

export default ProfileCardHeader;
