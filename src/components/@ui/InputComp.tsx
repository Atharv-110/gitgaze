import { MagnifyingGlassIcon } from "@/assets/icons/icons";
import { FormEvent, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import ButtonComp from "./ButtonComp";

interface IProps {
  setUsername: Dispatch<SetStateAction<string>>;
}

const InputComp: React.FC<IProps> = (props) => {
  const { setUsername } = props;
  const [inputValue, setInputValue] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setUsername(inputValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="search-box">
        <div className="icon-section">
          <MagnifyingGlassIcon />
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          className="search-input"
          placeholder="Search GitHub Username..."
        />
        <ButtonComp title="Search" type="submit" />
      </div>
    </form>
  );
};

export default InputComp;
