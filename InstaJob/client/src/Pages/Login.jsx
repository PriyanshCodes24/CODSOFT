import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "../Components/Loader";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../Context/AuthContext";
import { buttonUi } from "../Utils/uiClasses";
import PageTransition from "../Components/PageTransition";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!email || email == "") {
        return toast.error("Please enter an email");
      }
      if (!password || password == "") {
        return toast.error("Please enter an password");
      }
      setIsLoading(true);

      const payload = {
        email,
        password,
      };
      const response = await api.post(`/auth/login`, payload);

      localStorage.setItem("token", response.data.token);

      await login();
      toast.success("User Logged In successfully");
      navigate("/jobs");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md shadow-lg p-6 rounded-lg bg-white dark:bg-[#020617] border border-gray-200 dark:border-gray-800">
          <h1 className="font-bold text-2xl text-center">Welcome back</h1>
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-1">
            Log in to continue to your account
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email:
              </label>
              <input
                id="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={handleEmailChange}
                type="email"
                autoComplete="email"
                autoFocus
                className="w-full focus:outline-none focus:ring-1 focus:ring-[#22333B] rounded-md p-2 text-sm mt-1 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password:
              </label>
              <input
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={handlePasswordChange}
                type="password"
                autoComplete="current-password"
                className="w-full focus:outline-none focus:ring-1 focus:ring-[#22333B] rounded-md p-2 text-sm mt-1 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full font-semibold mt-6 mb-4 flex justify-center items-center gap-2 ${buttonUi} ${
                isLoading ? "opacity-60" : "cursor-pointer"
              }`}
            >
              {isLoading && <Loader />}
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="text-center">
            <Link
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 hover:dark:text-gray-300 hover:border-b text-sm"
              to="/register"
            >
              Don't have an account? Register
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Login;
