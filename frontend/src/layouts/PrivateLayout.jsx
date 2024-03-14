import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PrivateLayout = () => {
  return (
    <div className="flex flex-col ">
      <div className="  h-[100px] ">
        <Header />
      </div>
      <div className="">
        <Outlet />
      </div>
      <div className="  h-[120px] mt-auto  ">
        <Footer />
      </div>
    </div>
  );
};

export default PrivateLayout;
