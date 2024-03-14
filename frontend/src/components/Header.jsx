import SignupButton from "./SignupButton";
import LogoutButton from "./LogoutButton";
import { useSelector } from "react-redux";
import Nav from "./Nav";
import "../App.css";
const Header = () => {
  const token = useSelector((state) => state.auth.token);
  return (
    <div className="flex border border-black h-full p-2 justify-evenly items-center">
      <div className="dancing-script-font text-4xl"> Client Connect</div>
      <div>{token ? <Nav /> : null} </div>
      <div>{token ? <LogoutButton /> : <SignupButton />}</div>
    </div>
  );
};

export default Header;
