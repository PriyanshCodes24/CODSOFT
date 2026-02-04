import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../Context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      title={`${theme === "dark" ? "Light" : "Dark"} mode`}
      className="py-2 px-3 cursor-pointer text-gray-300 hover:text-white rounded-md transition-colors"
      onClick={toggleTheme}
    >
      {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
    </button>
  );
};

export default ThemeToggle;
