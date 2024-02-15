import {
  LocationIcon,
  TwitterIcon,
  BuildingIcon,
  LinkIcon,
} from "@/app/_assets/icons/icons";
import TypographyComp from "@/app/_components/@ui/TypographyComp";

interface IProps {
  location: string;
  twitter_username: string | null;
  blog: string;
  company: string;
}

const ProfileCardFooter: React.FC<IProps> = (props) => {
  const { location, twitter_username, blog, company } = props;
  return (
    <div className="mt-6 grid md:grid-cols-2 gap-4">
      <div className="flex items-center gap-4">
        <div className="card-footer-icon">
          <LocationIcon />
        </div>
        <TypographyComp variant="date" text={location} />
      </div>
      <div className="flex items-center gap-4">
        <div className="card-footer-icon">
          <TwitterIcon />
        </div>
        <TypographyComp
          variant={twitter_username ? "secondary_link" : "date"}
          url={`https://twitter.com/${twitter_username}`}
          text={twitter_username ?? "Not Available"}
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="card-footer-icon">
          <LinkIcon />
        </div>
        <TypographyComp
          variant={blog ? "secondary_link" : "date"}
          url={blog}
          text={blog}
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="card-footer-icon">
          <BuildingIcon />
        </div>
        <TypographyComp variant="date" text={company} />
      </div>
    </div>
  );
};

export default ProfileCardFooter;
