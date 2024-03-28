import { useNavigate } from "react-router-dom";

const SignupButton = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        type="button"
        onClick={() => navigate("/login")}
        className="border border-blue-300 rounded-md p-2  hover:bg-blue-400"
      >
        Login / Signup
      </button>
    </div>
  );
};

export default SignupButton;
