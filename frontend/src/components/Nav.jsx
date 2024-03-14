import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <nav className="flex  justify-between">
        <NavLink
          to="/data"
          className="border border-blue-300 rounded-md m-2 hover:bg-[#b7f8db] p-2"
        >
          DashBoard
        </NavLink>
        <NavLink
          to="/upload"
          className="border border-blue-300 rounded-md hover:bg-[#b7f8db] m-2 p-2"
        >
          Upload CSV
        </NavLink>
      </nav>
    </div>
  );
};

export default Nav;
