import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  useEffect(() => {}, []);

  return (
    <div className="flex justify-end bg-[#22333B] text-white gap-2 sm:gap-4 md:gap-6 p-4">
      <div
        className={`transition-all duration-300 cursor-pointer border-b-2 border-transparent hover:border-white ${
          location.pathname === "/" && "font-bold"
        }`}
        onClick={() => navigate("/")}
      >
        Home
      </div>
      {user?.role === "applicant" && (
        <div
          className={`transition-all duration-300 cursor-pointer border-b-2 border-transparent hover:border-white ${
            location.pathname === "/applicant-dashboard" && "font-bold"
          }`}
          onClick={() => navigate("/applicant-dashboard")}
        >
          Dashboard
        </div>
      )}
      {user?.role === "recruiter" && (
        <div
          className={`transition-all duration-300 cursor-pointer border-b-2 border-transparent hover:border-white ${
            location.pathname === "/recruiter-dashboard" && "font-bold"
          }`}
          onClick={() => navigate("/recruiter-dashboard")}
        >
          Dashboard
        </div>
      )}
      {user?.role === "recruiter" && (
        <div
          className={`transition-all duration-300 cursor-pointer border-b-2 border-transparent hover:border-white ${
            location.pathname === "/post" && "font-bold"
          }`}
          onClick={() => navigate("/post")}
        >
          Post
        </div>
      )}
      <div
        className={`transition-all duration-300 cursor-pointer border-b-2 border-transparent hover:border-white ${
          location.pathname === "/jobs" && "font-bold"
        }`}
        onClick={() => navigate("/jobs")}
      >
        Jobs
      </div>
      {!user && (
        <div
          className={`transition-all duration-300 cursor-pointer border-b-2 border-transparent hover:border-white ${
            location.pathname === "/login" && "font-bold"
          }`}
          onClick={() => navigate("/login")}
        >
          Login
        </div>
      )}
      {!user && (
        <div
          className={`transition-all duration-300 cursor-pointer border-b-2 border-transparent hover:border-white ${
            location.pathname === "/register" && "font-bold"
          }`}
          onClick={() => navigate("/register")}
        >
          Register
        </div>
      )}
      {user && (
        <div
          className={`transition-all duration-300 cursor-pointer border-b-2 border-transparent hover:border-white ${
            location.pathname === "/logout" && "font-bold"
          }`}
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          Logout
        </div>
      )}
    </div>
  );
};

export default Navbar;
