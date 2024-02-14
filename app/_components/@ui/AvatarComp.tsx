import Image from "next/image";
import im from "@/public/atharv-vani.jpg"

interface IProps {
  image: string | null
}

const AvatarComp:React.FC<IProps> = (props) => {
  return (
    <Image
      src={props.image ?? "/atharv-vani.jpg"}
      width={50}
      height={50}
      alt="avatar"
      className="w-full rounded-full"
    />
  );
};

export default AvatarComp;
