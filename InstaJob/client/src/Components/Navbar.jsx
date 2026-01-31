import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { FaUserPlus, FaUserTie } from "react-icons/fa6";
import { FiHome, FiBriefcase, FiLogOut, FiPlus, FiGrid } from "react-icons/fi";

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
      <div
        className={`group flex items-center gap-1 transition-all duration-200 cursor-pointer hover:font-semibold ${
          location.pathname === "/" && "font-semibold"
        }`}
        onClick={() => navigate("/")}
      >
        <FiHome
          title="home"
          size={18}
          className="mx-2 sm:mx-1 md:mx-0 transition-transform duration-200 group-hover:scale-110 text-gray-200 hover:text-white"
        />
        <p className="hidden md:block">Home</p>
      </div>
      {user?.role === "applicant" && (
        <div
          className={`group flex items-center gap-1 transition-all duration-200 cursor-pointer hover:font-semibold ${
            location.pathname === "/applicant/dashboard" && "font-semibold"
          }`}
          onClick={() => navigate("/applicant/dashboard")}
        >
          <FiGrid
            title="dashboard"
            size={18}
            className="mx-2 sm:mx-1 md:mx-0  transition-transform duration-200 group-hover:scale-110  text-gray-200 hover:text-white"
          />
          <p className="hidden md:block">Dashboard</p>
        </div>
      )}
      {user?.role === "recruiter" && (
        <div
          className={`group flex items-center gap-1 transition-all duration-200 cursor-pointer hover:font-semibold ${
            location.pathname === "/recruiter/dashboard" && "font-semibold"
          }`}
          onClick={() => navigate("/recruiter/dashboard")}
        >
          <FiGrid
            title="dashboard"
            size={18}
            className="mx-2 sm:mx-1 md:mx-0  transition-transform duration-200 group-hover:scale-110  text-gray-200 hover:text-white"
          />
          <p className="hidden md:block">Dashboard</p>
        </div>
      )}
      {user?.role === "recruiter" && (
        <div
          className={`group flex items-center gap-1 transition-all duration-200 cursor-pointer hover:font-semibold ${
            location.pathname === "/post" && "font-semibold"
          }`}
          onClick={() => navigate("/post")}
        >
          <FiPlus
            title="post"
            size={20}
            className="mx-2 sm:mx-1 md:mx-0  transition-transform duration-200 group-hover:scale-110  text-gray-200 hover:text-white"
          />
          <p className="hidden md:block">Post</p>
        </div>
      )}
      <div
        className={`group flex items-center gap-1 transition-all duration-200 cursor-pointer hover:font-semibold ${
          location.pathname === "/jobs" && "font-semibold"
        }`}
        onClick={() => navigate("/jobs")}
      >
        <FiBriefcase
          title="jobs"
          size={18}
          className="mx-2 sm:mx-1 md:mx-0  transition-transform duration-200 group-hover:scale-110  text-gray-200 hover:text-white"
        />
        <p className="hidden md:block">Jobs</p>
      </div>
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
