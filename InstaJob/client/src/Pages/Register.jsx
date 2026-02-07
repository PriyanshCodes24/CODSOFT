import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "../Components/Loader";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { buttonUi } from "../Utils/uiClasses";
import PageTransition from "../Components/PageTransition";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!name || name == "") {
        return toast.error("Please enter a name");
      }
      if (!email || email == "") {
        return toast.error("Please enter an email");
      }
      if (!password || password == "") {
        return toast.error("Please enter an password");
      }
      setIsLoading(true);

      const payload = {
        name,
        email,
        password,
      };
      await api.post(`/auth/register`, payload);

      toast.success("User Registered successfully");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full shadow-lg p-6 rounded-lg bg-white dark:bg-[#020617] border border-gray-200 dark:border-gray-800">
          <h1 className="font-bold text-2xl text-center">Register</h1>
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-1">
            Create your account
          </p>

          <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="text-sm text-gray-700 dark:text-gray-300 font-medium"
              >
                Name:
              </label>
              <input
                placeholder="John Doe"
                value={name}
                onChange={handleNameChange}
                type="text"
                id="name"
                autoComplete="name"
                autoFocus
                className="w-full focus:outline-none focus:ring-1 focus:ring-[#22333B] rounded-md p-2 text-sm mt-1 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-sm text-gray-700 dark:text-gray-300 font-medium"
              >
                Email:
              </label>
              <input
                placeholder="example@gmail.com"
                value={email}
                onChange={handleEmailChange}
                type="email"
                autoComplete="email"
                id="email"
                className="w-full focus:outline-none focus:ring-1 focus:ring-[#22333B] rounded-md p-2 text-sm mt-1 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm text-gray-700 dark:text-gray-300 font-medium"
              >
                Password:
              </label>
              <input
                placeholder="••••••••"
                value={password}
                onChange={handlePasswordChange}
                type="password"
                autoComplete="current-password"
                id="password"
                className="w-full focus:outline-none focus:ring-1 focus:ring-[#22333B] rounded-md p-2 text-sm mt-1 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full font-semibold mt-6 mb-4 flex items-center justify-center gap-2 ${buttonUi} ${
                isLoading ? "opacity-60" : "cursor-pointer"
              }`}
            >
              {isLoading && <Loader />}
              {isLoading ? "Signing up..." : "Sign up"}
            </button>
          </form>
          <div className="text-center">
            <Link
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 hover:dark:text-gray-300 hover:border-b text-sm"
              to="/login"
            >
              Already have an account? Login
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Register;
