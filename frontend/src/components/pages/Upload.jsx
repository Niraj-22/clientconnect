import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../utils/axiosInstance";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setMessage("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/data/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("File uploaded successfully");
      toast.success(response.data.message, {
        autoClose: true,
      });
      navigate("/data");
    } catch (error) {
      setMessage("Error uploading file");
      console.error(error);
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#b7f8db] to-[#50a7c2] h-screen flex text-3xl  items-center justify-center text-white ">
      <div className="border rounded-xl text-center p-3">
        <p className="text-5xl p-4">Upload CSV File</p>
        <form onSubmit={handleSubmit} className="border rounded-md p-3">
          <input type="file" onChange={handleFileChange} accept=".csv" />
          <button
            type="submit"
            className="border  bg-slate-200 text-slate-700 rounded-md p-1 hover:bg-blue-400 hover:text-white "
          >
            Upload
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Upload;
