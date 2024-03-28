import { useDispatch } from "react-redux";
import { logout } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout Successfully", {
      autoClose: true,
    });
    navigate("/");
  };
  return (
    <div>
      <button
        type="button"
        onClick={() => handleLogout()}
        className="border border-blue-300 rounded-md p-2  hover:bg-blue-400"
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
