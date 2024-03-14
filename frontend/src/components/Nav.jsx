import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <nav className="flex  justify-between">
        <NavLink to="/data" className="border border-blue-300 rounded-md p-2">
          DashBoard
        </NavLink>
        <NavLink to="/upload" className="border border-blue-300 rounded-md p-2">
          Upload CSV
        </NavLink>
      </nav>
    </div>
  );
};

export default Nav;
