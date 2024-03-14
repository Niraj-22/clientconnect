import { useState } from "react";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import loginValidator from "../validators/loginValidator";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../store/auth";

const Login = () => {
  const initialFormData = {
    password: "",
    email: "",
  };
  const initialFormError = {
    password: "",
    email: "",
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = loginValidator({
      email: formData.email,
      password: formData.password,
    });

    if (errors.email || errors.password) {
      setFormError(errors);
    } else {
      try {
        setLoading(true);

        // api request
        const response = await axios.post("/auth/login", formData);
        const data = response.data.data;
        dispatch(login(data.token));

        toast.success("Login Successfully", {
          autoClose: true,
        });

        setFormData(initialFormData);
        setFormError(initialFormError);
        setLoading(false);
        navigate("/");
      } catch (error) {
        console.log(error);
        setFormData(initialFormData);
        setFormError(initialFormError);
        setLoading(false);
        const response = error.response;
        const data = response.data;
        toast.error(data.message, {
          autoClose: true,
        });
      }
    }
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen text-slate-300 bg-blue-300 text-2xl ">
        <form
          onSubmit={handleSubmit}
          className="flex-col shadow-2xl shadow-zinc-700 bg-blue-500 rounded-3xl  p-4  hover:border border-slate-700"
        >
          <p className="text-center text-2xl p-4 font-mono"> Login</p>
          <div className="flex flex-col justify-center p-2">
            <label className=" mb-1">Email </label>

            <input
              className="rounded-xl  bg-blue-100 border text-black border-blue-300 text-center"
              type="email"
              name="email"
              placeholder="doe@gmail.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="off"
            />
            <div className="text-red-700 text-xs p-1">
              {formError.email && <p className="">*{formError.email}</p>}
            </div>
          </div>
          <div className="flex flex-col justify-center p-2">
            <label className=" mb-1">Password </label>

            <input
              className="rounded-xl  bg-blue-100 border text-black border-blue-300 text-center"
              type="password"
              name="password"
              placeholder="***********"
              value={formData.password}
              onChange={handleChange}
            />
            <div className="text-red-700 text-xs p-1">
              {formError.password && <p className="">*{formError.password}</p>}
            </div>
          </div>
          <div className="p-2 flex flex-rol place-content-around">
            <button
              className="rounded-md bg-blue-600 p-1 hover:bg-blue-900"
              type="submit"
              value={`${loading ? "Login in ...." : "Login"}`}
            >
              Login
            </button>
            <button
              className="rounded-md bg-blue-600 p-1 hover:bg-blue-900"
              type="submit"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default Login;
