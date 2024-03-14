import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-b from-[#b7f8db] to-[#50a7c2] h-screen flex flex-col items-center justify-center text-white ">
      <p className="text-3xl p-4">Welcome to Customer Segment Pro</p>
      <button
        type="button"
        onClick={() => navigate("/upload")}
        className="border h-fit bg-slate-200 text-slate-700 rounded-md p-3 hover:bg-blue-400 hover:text-white "
      >
        Lets start
      </button>
    </div>
  )
}

export default Home