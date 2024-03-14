import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PrivateLayout = () => {
  return (
    <div className="flex flex-col">
      <div className="h-[100px]">
        <Header />
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
      <div className="h-[120px]">
        <Footer />
      </div>
    </div>
  );
};

export default PrivateLayout;
