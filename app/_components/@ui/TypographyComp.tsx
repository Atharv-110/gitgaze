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
      return <h1 className="text-3xl font-semibold tracking-wide">{text}</h1>;
    case "subtitle":
      return <p className="text-theme-gray-light">{text}</p>;
    case "date":
      return <p className="text-theme-gray text-lg">{text}</p>;
    case "link":
      return (
        <Link
          href={`${url}`}
          className="text-theme-blue hover:underline underline-offset-2"
        >
          @{text}
        </Link>
      );
    default:
      return null;
  }
};

export default TypographyComp;
