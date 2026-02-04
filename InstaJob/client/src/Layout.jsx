import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#020617] text-gray-700 dark:text-gray-300">
      <Navbar />
      <Outlet classNamep />
    </div>
  );
};

export default Layout;
