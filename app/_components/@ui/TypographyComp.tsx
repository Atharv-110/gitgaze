import Link from "next/link";

interface IProps {
  variant: "title" | "subtitle" | "link" | "date";
  text: string;
  url?: string;
}

const TypographyComp: React.FC<IProps> = (props) => {
  const { variant, text, url } = props;
  switch (variant) {
    case "title":
      return <h1 className="text-xl md:text-3xl font-semibold tracking-wide">{text}</h1>;
    case "subtitle":
      return <p className="text-sm md:text-base text-theme-gray-light">{text}</p>;
    case "date":
      return <p className="text-base md:text-lg text-theme-gray">{text}</p>;
    case "link":
      return (
        <Link
          target="_blank"
          href={`${url}`}
          className="text-sm md:text-base text-theme-blue hover:underline underline-offset-2"
        >
          @{text}
        </Link>
      );
    default:
      return null;
  }
};

export default TypographyComp;
