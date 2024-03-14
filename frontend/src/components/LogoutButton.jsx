import { useDispatch } from "react-redux";
import { logout } from "../store/auth";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div>
      <button
        type="button"
        onClick={() => handleLogout()}
        className="border border-blue-300 rounded-md p-2"
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
