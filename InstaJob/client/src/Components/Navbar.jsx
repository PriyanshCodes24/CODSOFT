import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex justify-end bg-[#22333B] text-white gap-2 sm:gap-4 md:gap-6 p-4">
      {/* <img
      src="client\public\2.png"
        className={`transition-all duration-300 cursor-pointer border-b-2 border-transparent hover:border-white ${
          location.pathname === "/" && "font-bold"
        }`}
        onClick={() => navigate("/")}
      /> */}
      <div
        className={`transition-all duration-300 cursor-pointer border-b-2 border-transparent hover:border-white ${
          location.pathname === "/" && "font-bold"
        }`}
        onClick={() => navigate("/")}
      >
        Home
      </div>
      <div
        className={`transition-all duration-300 cursor-pointer border-b-2 border-transparent hover:border-white ${
          location.pathname === "/candidate-dashboard" && "font-bold"
        }`}
        onClick={() => navigate("/candidate-dashboard")}
      >
        Dashboard
      </div>
      <div
        className={`transition-all duration-300 cursor-pointer border-b-2 border-transparent hover:border-white ${
          location.pathname === "/form" && "font-bold"
        }`}
        onClick={() => navigate("/form")}
      >
        Form
      </div>
      <div
        className={`transition-all duration-300 cursor-pointer border-b-2 border-transparent hover:border-white ${
          location.pathname === "/jobs" && "font-bold"
        }`}
        onClick={() => navigate("/jobs")}
      >
        Jobs
      </div>
      <div
        className={`transition-all duration-300 cursor-pointer border-b-2 border-transparent hover:border-white ${
          location.pathname === "/login" && "font-bold"
        }`}
        onClick={() => navigate("/login")}
      >
        Login
      </div>
      {/* <div
        className={`transition-all duration-300 cursor-pointer border-b-2 border-transparent hover:border-white ${
          location.pathname === "/register" && "font-bold"
        }`}
        onClick={() => navigate("/register")}
      >
        Register
      </div> */}
    </div>
  );
};

export default Navbar;
