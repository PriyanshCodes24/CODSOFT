import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { FaUserPlus, FaUserTie } from "react-icons/fa6";
import { FiHome, FiBriefcase, FiLogOut, FiPlus, FiGrid } from "react-icons/fi";
import Navitem from "./Navitem";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const capitalize = (role) => {
    const cap = role.charAt(0).toUpperCase() + role.slice(1);
    return cap;
  };

  return (
    <motion.div
      layout
      className="flex justify-end bg-[#22333B] dark:bg-[#020617] text-white gap-2 sm:gap-4 md:gap-6 p-4"
    >
      {user && (
        <div className={`flex mr-auto gap-1 items-center `}>
          {user?.role === "recruiter" ? (
            <FaUserTie title="recruiter" className="text-sm" />
          ) : (
            <FaUserPlus size={16} title="applicant" className="text-sm" />
          )}
          <div className="sm:block hidden text-sm text-gray-300">
            {capitalize(user?.role) || ""}
          </div>
        </div>
      )}
      <Navitem
        title="Home"
        icon={FiHome}
        label="Home"
        active={location.pathname === "/"}
        onClick={() => navigate("/")}
      />
      {user?.role === "applicant" && (
        <Navitem
          title="Dashboard"
          icon={FiGrid}
          label="Dashboard"
          active={location.pathname === "/applicant/dashboard"}
          onClick={() => navigate("/applicant/dashboard")}
        />
      )}
      {user?.role === "recruiter" && (
        <Navitem
          title="Dashboard"
          icon={FiGrid}
          label="Dashboard"
          active={location.pathname === "/recruiter/dashboard"}
          onClick={() => navigate("/recruiter/dashboard")}
        />
      )}
      {user?.role === "recruiter" && (
        <Navitem
          title="Post"
          icon={FiPlus}
          size={20}
          label="Post"
          active={location.pathname === "/post"}
          onClick={() => navigate("/post")}
        />
      )}
      <Navitem
        title="Jobs"
        icon={FiBriefcase}
        label="Jobs"
        active={location.pathname.startsWith("/jobs")}
        onClick={() => navigate("/jobs")}
      />
      {!user && (
        <motion.div
          layout
          className={`flex items-center transition-colors px-3 py-2 rounded-md cursor-pointer text-gray-300 hover:text-white  ${
            location.pathname === "/login" &&
            "text-white bg-white/10 font-semibold"
          }`}
          onClick={() => navigate("/login")}
        >
          Login
        </motion.div>
      )}
      {!user && (
        <motion.div
          layout
          className={`flex items-center transition-colors px-3 py-2 rounded-md cursor-pointer text-gray-300 hover:text-white ${
            location.pathname === "/register" &&
            "text-white bg-white/10 font-semibold"
          }`}
          onClick={() => navigate("/register")}
        >
          Register
        </motion.div>
      )}
      <ThemeToggle />
      {user && (
        <Navitem
          title="Logout"
          icon={FiLogOut}
          label="Logout"
          active={false}
          onClick={() => {
            if (!window.confirm("Are you sure you want to logout?")) return;
            logout();
            navigate("/login");
          }}
        />
      )}
    </motion.div>
  );
};

export default Navbar;
