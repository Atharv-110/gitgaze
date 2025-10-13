interface IProps {
  title: string;
  type?: "submit" | "button";
  onClick?: () => void;
}

const ButtonComp: React.FC<IProps> = (props) => {
  const { title, type, onClick } = props;
  return <button onClick={onClick} type={type} className="btn">{title}</button>;
};

export default ButtonComp;
