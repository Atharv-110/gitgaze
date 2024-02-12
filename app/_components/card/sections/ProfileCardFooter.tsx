import {
  LocationIcon,
  TwitterIcon,
  BuildingIcon,
  LinkIcon,
} from "@/app/_assets/icons/icons";
import TypographyComp from "@/app/_components/@ui/TypographyComp";

const ProfileCardFooter = () => {
  return (
    <div className="mt-8">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 flex items-center justify-center">
          <LocationIcon />
        </div>
        <TypographyComp variant="date" text="Indore" />
      </div>
    </div>
  );
};

export default ProfileCardFooter;
