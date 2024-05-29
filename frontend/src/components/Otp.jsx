import { useState, useRef } from "react";
import axios from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Otp = ({ email }) => {
  const [otpcode, setOtpcode] = useState(new Array(6).fill(""));
  const [error, setError] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    setOtpcode([
      ...otpcode.map((d, idx) => (idx === index ? element.value : d)),
    ]);

    // Focus next input field
    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !otpcode[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otpcode) {
      setError(true);
    } else {
      try {
        const formData = {
          email,
          code: parseFloat(otpcode.toString().replace(/,/g, "")),
        };
        const response = await axios.post("/auth/verify-user", formData);
        console.log(response);
        navigate("/login");
        toast.success("Email Verified Successfully", {
          autoClose: true,
        });
      } catch (error) {
        if (error) {
          toast.error(error, {
            autoClose: true,
          });
        }
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="flex space-x-2">
        {otpcode.map((data, index) => (
          <input
            key={index}
            type="text"
            className="w-11 h-11 border border-gray-300 bg-blue-100 text-black rounded text-center text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength="1"
            value={data}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputRefs.current[index] = el)}
          />
        ))}
      </div>
      <div className="text-red-700 text-xs p-1">
        {error && <p className="">*Otp is Required</p>}
      </div>
      <div>
        <button
          className="rounded-md bg-blue-600 p-1 m-4 hover:bg-blue-900"
          type="submit"
          onClick={handleSubmit}
        >
          Verify Email
        </button>
      </div>
    </div>
  );
};

export default Otp;
