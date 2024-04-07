import SignupButton from "./SignupButton";
import LogoutButton from "./LogoutButton";
import { useSelector } from "react-redux";
import logo from "../assets/logo.webp";
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
    <div className="flex border border-black h-full p-2 justify-around items-center">
      <div className="cursor-pointer flex  " onClick={(e) => handleClick(e)}>
        <img src={logo} alt="Logo" className="h-16" />
        <div>
          <p className="dancing-script-font text-6xl text-end ">
            Client Connect
          </p>
        </div>
      </div>
      <div>{token ? <Nav /> : null} </div>
      <div>{token ? <LogoutButton /> : <SignupButton />}</div>
    </div>
  );
};

export default Header;
