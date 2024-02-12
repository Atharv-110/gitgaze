import {
  LocationIcon,
  TwitterIcon,
  BuildingIcon,
  LinkIcon,
} from "@/app/_assets/icons/icons";
import TypographyComp from "@/app/_components/@ui/TypographyComp";

const ProfileCardFooter:React.FC = () => {
  return (
    <div className="mt-6 grid md:grid-cols-2 gap-4">
      <div className="flex items-center gap-4">
        <div className="card-footer-icon">
          <LocationIcon />
        </div>
        <TypographyComp variant="date" text="Indore" />
      </div>
      <div className="flex items-center gap-4">
        <div className="card-footer-icon">
          <TwitterIcon />
        </div>
        <TypographyComp variant="date" text="Indore" />
      </div>
      <div className="flex items-center gap-4">
        <div className="card-footer-icon">
          <LinkIcon />
        </div>
        <TypographyComp variant="date" text="Indore" />
      </div>
      <div className="flex items-center gap-4">
        <div className="card-footer-icon">
          <BuildingIcon />
        </div>
        <TypographyComp variant="date" text="Indore" />
      </div>
    </div>
  );
};

export default ProfileCardFooter;
