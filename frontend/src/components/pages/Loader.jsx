import { BeatLoader } from "react-spinners";

const Loader = ({ loading }) => {
  return (
    <div className="flex justify-center p-8 h-screen items-center w-full bg-zinc-800">
      <BeatLoader color={"#FFFFFF"} loading={loading} size={15} />
    </div>
  );
};

export default Loader;
