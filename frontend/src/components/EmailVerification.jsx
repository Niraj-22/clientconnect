import { useState } from "react";
import axios from "../utils/axiosInstance";
import { toast } from "react-toastify";
import Otp from "./Otp";
const EmailVerification = () => {
  const initialFormData = {
    email: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(false);
  const [sent, setSent] = useState(false);
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      setError(true);
    } else {
      try {
        const response = await axios.post(
          "/auth/send-verification-email",
          formData
        );
        if (response) {
          setSent(true);
        }
        toast.success("Otp Sent Successfully", {
          autoClose: true,
        });
      } catch (error) {
        if (error) {
          setFormData("");
          setError(true);
          setSent(false);
        }
      }
    }
  };
  return (
    <div className="flex justify-center items-center h-screen text-slate-300 bg-blue-300 text-2xl ">
      <form
        onSubmit={handleSubmit}
        className="flex-col shadow-2xl shadow-zinc-700 bg-blue-500 rounded-3xl h-fit p-4 max-w-fit   hover:border border-slate-700"
      >
        <p className="text-center text-2xl p-4 font-mono"> Verify Email</p>
        <div className="flex flex-col justify-center p-2">
          <label className=" mb-1">Re-Enter Email</label>

          <input
            className="p-2 rounded-md max-w-fit bg-blue-100 text-black border border-blue-300 text-center"
            type="email"
            name="email"
            placeholder="xyz@gmail.com"
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
          />
          <div className="text-red-700 text-xs p-1">
            {error && <p className="">*Email is Required</p>}
          </div>
        </div>
        {sent ? (
          <div>
            <Otp email={formData.email} />
          </div>
        ) : (
          <button
            className="rounded-md bg-blue-600 p-1 hover:bg-blue-900"
            type="submit"
          >
            Send Otp
          </button>
        )}
      </form>
    </div>
  );
};

export default EmailVerification;
