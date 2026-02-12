import twitter from "@/assets/icons/twitter.svg";
import linkedin from "@/assets/icons/linkedin.svg";
import email from "@/assets/icons/mail.svg";
import reddit from "@/assets/icons/reddit.svg";
import instagram from "@/assets/icons/instagram.svg";
import link from "@/assets/icons/link.svg";
import youtube from "@/assets/icons/youtube.svg";
type IconMap = { [key: string]: { src: string } };

const icons: IconMap = {
  TWITTER: twitter,
  LINKEDIN: linkedin,
  EMAIL: email,
  REDDIT: reddit,
  INSTAGRAM: instagram,
  YOUTUBE: youtube,
  GENERIC: link,
};

export function getIcon(param?: string): string | undefined {
  if (!param || !icons[param]) return icons["GENERIC"].src;
  return icons[param].src;
}
