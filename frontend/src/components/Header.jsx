import SignupButton from "./SignupButton";
import LogoutButton from "./LogoutButton";
import { useSelector } from "react-redux";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const handleClick = (e) => {
    e.stopPropagation();
    navigate("/");
  };
  return (
    <div className="flex border border-black h-full p-2 justify-evenly items-center">
      <div
        className="dancing-script-font text-4xl cursor-pointer"
        onClick={(e) => handleClick(e)}
      >
        Client Connect
      </div>
      <div>{token ? <Nav /> : null} </div>
      <div>{token ? <LogoutButton /> : <SignupButton />}</div>
    </div>
  );
};

export default Header;
