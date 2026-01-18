import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "../Components/Loader";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../Context/AuthContext";
import { buttonUi } from "../Utils/uiClasses";

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
      console.log(response.data);

      localStorage.setItem("token", response.data.token);

      await login();
      toast.success("User Logged In successfully");
      navigate("/jobs");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA] px-4">
      <div className="w-full max-w-md shadow-lg p-6 rounded-lg bg-white border border-gray-200">
        <h1 className="font-bold text-2xl text-center">Welcome back</h1>
        <p className="text-center text-gray-500 text-sm mt-1">
          Login to continue to your account
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium text-gray-700">Email:</label>
            <input
              placeholder="example@gmail.com"
              value={email}
              onChange={handleEmailChange}
              type="email"
              autoFocus
              className="mt-1 w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#22333B] text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              placeholder="••••••••"
              value={password}
              onChange={handlePasswordChange}
              type="password"
              className="mt-1 w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#22333B] text-sm"
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
            {isLoading ? "Logging in" : "Login"}
          </button>
        </form>
        <div className="text-center">
          <Link
            className="text-gray-500 hover:text-gray-700 hover:border-b text-sm"
            to="/register"
          >
            Don't have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
