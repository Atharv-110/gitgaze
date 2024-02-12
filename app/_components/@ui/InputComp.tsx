import { FormEvent, useState } from "react";
import ButtonComp from "@/app/_components/@ui/ButtonComp";
import { MagnifyingGlassIcon } from "@/app/_assets/icons/icons";
import { Dispatch, SetStateAction } from "react";

interface IProps {
  setUsername: Dispatch<SetStateAction<string>>;
}

const InputComp: React.FC<IProps> = (props) => {
  const { setUsername } = props;
  const [inputValue, setInputValue] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setUsername(inputValue)
    // setData(await searchUser(inputValue));
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
