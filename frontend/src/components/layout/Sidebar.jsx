import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUpload,
  FaTable,
  FaChartBar,
  FaBrain,
  FaMagic,
  FaFileAlt,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login", { replace: true });
  };

  const linkClass = ({ isActive }) =>
    `w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-blue-600 text-white shadow-lg"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <aside className="w-72 min-h-screen bg-slate-900 border-r border-slate-800 flex flex-col">

      {/* Logo */}
      <div className="p-8 border-b border-slate-800">
        <h1 className="text-3xl font-bold text-white">
          AIBI
        </h1>

        <p className="text-slate-400 text-sm mt-2">
          AI Business Intelligence
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-5 space-y-2">

        <NavLink to="/dashboard" className={linkClass}>
          <FaHome />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/upload" className={linkClass}>
          <FaUpload />
          <span>Upload Dataset</span>
        </NavLink>

        <NavLink to="/preview" className={linkClass}>
          <FaTable />
          <span>Preview Dataset</span>
        </NavLink>

        <NavLink to="/analysis" className={linkClass}>
          <FaChartBar />
          <span>Analysis</span>
        </NavLink>

        <NavLink to="/train" className={linkClass}>
          <FaBrain />
          <span>Train Model</span>
        </NavLink>

        <NavLink to="/predict" className={linkClass}>
          <FaMagic />
          <span>Predict</span>
        </NavLink>

        <NavLink to="/reports" className={linkClass}>
          <FaFileAlt />
          <span>Reports</span>
        </NavLink>

      </nav>

      {/* Bottom */}
      <div className="p-5 border-t border-slate-800 space-y-3">

        <button
          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-300"
        >
          <FaCog />
          <span>Settings</span>
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-all duration-300"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;