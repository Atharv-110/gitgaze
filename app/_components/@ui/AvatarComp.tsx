import Image from "next/image";

const AvatarComp = () => {
  return (
    <Image
      src="/atharv-vani.jpg"
      width={50}
      height={50}
      alt="avatar"
      className="w-full rounded-full"
    />
  );
};

export default AvatarComp;
