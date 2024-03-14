import { useNavigate } from "react-router-dom";

const SignupButton = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        type="buttton"
        onClick={() => navigate("/login")}
        className="border border-blue-300 rounded-md p-2"
      >
        Login
      </button>
    </div>
  );
};

export default SignupButton;
