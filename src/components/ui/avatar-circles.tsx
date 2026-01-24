import { cn } from "@/lib/client.helpers";
import Image from "next/image";
import Link from "next/link";

interface Avatar {
  imageUrl: string;
  profileUrl: string;
}
interface AvatarCirclesProps {
  className?: string;
  numPeople?: number;
  avatarUrls: Avatar[];
}

export const AvatarCircles = ({
  numPeople,
  className,
  avatarUrls,
}: AvatarCirclesProps) => {
  return (
    <div className={cn("z-10 flex -space-x-4 rtl:space-x-reverse", className)}>
      {avatarUrls.map((url, index) => (
        <Link
          key={index}
          href={url.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            key={index}
            className="h-10 w-10 md:h-12 md:w-12 rounded-full border-2 border-white dark:border-gray-800"
            src={url.imageUrl}
            width={48}
            height={48}
            alt={`Avatar ${index + 1}`}
          />
        </Link>
      ))}
      {(numPeople ?? 0) > 0 && (
        <Link
          className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border-2 border-white bg-black text-center text-xs font-medium text-white hover:bg-gray-600 dark:border-gray-800 dark:bg-white dark:text-black"
          href=""
        >
          +{numPeople}
        </Link>
      )}
    </div>
  );
};
