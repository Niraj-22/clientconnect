import { useState } from "react";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import signupValidator from "../validators/signupValidator";

const Signup = () => {
  const initialFormData = {
    password: "",
    email: "",
    name: "",
  };
  const initialFormError = {
    password: "",
    email: "",
    name: "",
  };
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = signupValidator({
      email: formData.email,
      password: formData.password,
      name: formData.name,
    });

    if (errors.email || errors.password || errors.name) {
      setFormError(errors);
    } else {
      try {
        setLoading(true);

        // api request
        const response = await axios.post("/auth/signup", formData);
        const data = response.data;
        console.log(data);
        toast.success("Sign In  Successfully", {
          autoClose: true,
        });

        setFormData(initialFormData);
        setFormError(initialFormError);
        setLoading(false);
        navigate("/");
      } catch (error) {
        setLoading(false);
        console.log(error);
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
      <div className="flex justify-center items-center h-screen text-slate-300 bg-blue-300 ">
        <form
          onSubmit={handleSubmit}
          className="flex-col shadow-2xl shadow-zinc-700 bg-blue-500 rounded-3xl h-fit p-4 max-w-fit   hover:border border-slate-700"
        >
          <p className="text-center text-2xl p-4 font-mono"> Sign Up</p>
          <div className="flex flex-col justify-center p-2">
            <label className=" mb-1">Name </label>

            <input
              className="rounded-xl max-w-fit bg-blue-100 border border-blue-300 text-center"
              type="name"
              name="name"
              placeholder="A B C"
              value={formData.name}
              onChange={handleChange}
              autoComplete="off"
            />
            <div className="text-red-700 text-xs p-1">
              {formError.name && <p className="">*{formError.name}</p>}
            </div>
          </div>
          <div className="flex flex-col justify-center p-2">
            <label className=" mb-1">Email </label>

            <input
              className="rounded-xl max-w-fit bg-blue-100 border border-blue-300 text-center"
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
              className="rounded-xl max-w-fit bg-blue-100 border border-blue-300 text-center"
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
              Sign - In
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default Signup;
