import ButtonComp from "@/app/_components/@ui/ButtonComp";
import { MagnifyingGlassIcon } from "@/app/_assets/icons/icons";

const InputComp: React.FC = () => {
  return (
    <form>
      <div className="search-box">
        <div className="icon-section">
          <MagnifyingGlassIcon />
        </div>
        <input type="text" name="username" className="search-input"/>
        <ButtonComp title="Search" type="submit" />
      </div>
    </form>
  );
};

export default InputComp;
