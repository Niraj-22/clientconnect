import { useNavigate } from "react-router-dom";

const SignupButton = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        type="button"
        onClick={() => navigate("/login")}
        className="border border-blue-300 rounded-lg p-2 text-2xl  hover:bg-blue-400 hover:text-white"
      >
        Login / Signup
      </button>
    </div>
  );
};

export default SignupButton;
