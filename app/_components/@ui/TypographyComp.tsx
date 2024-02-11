import Link from "next/link";

interface IProps {
  variant: "title" | "subtitle" | "link";
  text: string;
  url?: string;
}

const TypographyComp: React.FC<IProps> = (props) => {
  const { variant, text, url } = props;
  switch (variant) {
    case "title":
      return <h1 className="text-3xl font-semibold tracking-wide">{text}</h1>;
    case "subtitle":
      // code block
      break;
    case "link":
      return (
        <Link
          href={`${url}`}
          className="text-theme-blue hover:underline underline-offset-4"
        >
          @{text}
        </Link>
      );
    default:
      return null;
  }
};

export default TypographyComp;
