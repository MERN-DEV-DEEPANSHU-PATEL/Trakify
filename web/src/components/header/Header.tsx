import { Dispatch, SetStateAction } from "react";
import "./Header.scss";

type Props = {
  setShowTaskForm: Dispatch<SetStateAction<boolean>>;
};

const Header = ({ setShowTaskForm }: Props) => {
  return (
    <header>
      <nav>
        <div className="logo">
          <h1>Trakify</h1>
        </div>
        <div className="addBtn">
          <button onClick={() => setShowTaskForm(true)}>Create Task</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
