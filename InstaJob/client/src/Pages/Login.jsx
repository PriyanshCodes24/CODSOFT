import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "../Components/Loader";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const API = import.meta.env.VITE_API;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
      const response = await axios.post(`${API}/auth/login`, payload);
      console.log(response.data);

      localStorage.setItem("token", response.data.token);

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
    <div className="flex items-center justify-center bg-[#EAE0D5] text-[#5E503F] h-screen">
      <div className="w-md shadow-xl p-4 rounded-md bg-[#e8d8cc]">
        <h1 className="font-bold text-2xl text-center">Login</h1>

        <form className="flex flex-col gap-y-2 p-8" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="name">Email:</label>
            <input
              placeholder="example@gmail.com"
              value={email}
              onChange={handleEmailChange}
              type="email"
              id="email"
              className="border bg-[#e5e2df] rounded-md p-2 focus:outline-none text-sm"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="name">Password:</label>
            <input
              placeholder="Password123"
              value={password}
              onChange={handlePasswordChange}
              type="password"
              id="password"
              className="border bg-[#e5e2df] rounded-md p-2 focus:outline-none text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`mt-4 hover:shadow-lg bg-[#22333B] focus:bg-[#233c4d] hover:bg-[#233c4d] text-white border-0 rounded-md p-3 ${
              isLoading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {isLoading ? <Loader /> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
