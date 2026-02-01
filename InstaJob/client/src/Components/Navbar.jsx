import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { FaUserPlus, FaUserTie } from "react-icons/fa6";
import { FiHome, FiBriefcase, FiLogOut, FiPlus, FiGrid } from "react-icons/fi";
import Navitem from "./Navitem";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const capitalize = (role) => {
    const cap = role.charAt(0).toUpperCase() + role.slice(1);
    return cap;
  };

  return (
    <div className="flex justify-end bg-[#22333B] text-white gap-2 sm:gap-4 md:gap-6 p-4">
      {user && (
        <div className={`flex mr-auto gap-1`}>
          {user?.role === "recruiter" ? (
            <FaUserTie title="recruiter" className="translate-y-1 text-sm" />
          ) : (
            <FaUserPlus
              size={16}
              title="applicant"
              className="translate-y-1 text-sm"
            />
          )}
          <div className="sm:block hidden">{capitalize(user?.role) || ""}</div>
        </div>
      )}
      <Navitem
        icon={FiHome}
        label="Home"
        active={location.pathname === "/"}
        onClick={() => navigate("/")}
      />
      {user?.role === "applicant" && (
        <Navitem
          icon={FiGrid}
          label="Dashboard"
          active={location.pathname === "/applicant/dashboard"}
          onClick={() => navigate("/applicant/dashboard")}
        />
      )}
      {user?.role === "recruiter" && (
        <Navitem
          icon={FiGrid}
          label="Dashboard"
          active={location.pathname === "/recruiter/dashboard"}
          onClick={() => navigate("/recruiter/dashboard")}
        />
      )}
      {user?.role === "recruiter" && (
        <Navitem
          icon={FiPlus}
          size={20}
          label="Post"
          active={location.pathname === "/post"}
          onClick={() => navigate("/post")}
        />
      )}
      <Navitem
        icon={FiBriefcase}
        label="Jobs"
        active={location.pathname === "/jobs"}
        onClick={() => navigate("/jobs")}
      />
      {!user && (
        <div
          className={`group flex items-center gap-1 transition-all duration-200 cursor-pointer hover:font-semibold ${
            location.pathname === "/login" && "font-semibold"
          }`}
          onClick={() => navigate("/login")}
        >
          Login
        </div>
      )}
      {!user && (
        <div
          className={`flex items-center gap-1 transition-all duration-200 cursor-pointer hover:font-semibold ${
            location.pathname === "/register" && "font-semibold"
          }`}
          onClick={() => navigate("/register")}
        >
          Register
        </div>
      )}
      {user && (
        <div
          className={`group flex items-center gap-1 transition-all duration-200 cursor-pointer hover:font-semibold ${
            location.pathname === "/logout" && "font-semibold"
          }`}
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          <FiLogOut
            title="logout"
            size={18}
            className="mx-2 sm:mx-1 md:mx-0 transition-transform duration-200 group-hover:scale-110  text-gray-200 hover:text-white"
          />
          <p className="hidden md:block">Logout</p>
        </div>
      )}
    </div>
  );
};

export default Navbar;
