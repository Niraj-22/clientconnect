import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <nav className="flex  justify-between">
        <NavLink
          to="/upload"
          className="border border-blue-300 rounded-lg text-2xl hover:text-white  hover:bg-blue-400 m-2 p-2"
        >
          Upload CSV
        </NavLink>
        <NavLink
          to="/data"
          className="border border-blue-300 rounded-lg text-2xl hover:text-white m-2 hover:bg-blue-400 p-2"
        >
          DashBoard
        </NavLink>
      </nav>
    </div>
  );
};

export default Nav;
