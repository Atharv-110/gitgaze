import TypographyComp from "../../@ui/TypographyComp";

const ProfileCardMain = () => {
  return (
    <div className="bg-white-dull py-4 flex justify-around rounded-lg">
      <div>
        <TypographyComp variant="date" text="Repos" />
        <TypographyComp variant="title" text="8" />
      </div>
      <div>
        <TypographyComp variant="date" text="Followers" />
        <TypographyComp variant="title" text="12228" />
      </div>
      <div>
        <TypographyComp variant="date" text="Following" />
        <TypographyComp variant="title" text="9" />
      </div>
    </div>
  );
};

export default ProfileCardMain;
