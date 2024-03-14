import { useDispatch } from "react-redux";
import { logout } from "../store/auth";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div>
      <button
        type="button"
        onClick={() => handleLogout()}
        className="border border-blue-300 rounded-md p-2  hover:bg-[#b7f8db]"
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
