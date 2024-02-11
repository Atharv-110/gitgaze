interface IProps {
  title: string;
  type?: "submit" | "button";
}

const ButtonComp: React.FC<IProps> = (props) => {
  const { title, type } = props;
  return <button type={type} className="btn">{title}</button>;
};

export default ButtonComp;
