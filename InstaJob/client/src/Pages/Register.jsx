import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "../Components/Loader";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const API = import.meta.env.VITE_API;
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
      setIsLoading(true);

      if (!name || name == "") {
        return toast.error("Please enter a name");
      }
      if (!email || email == "") {
        return toast.error("Please enter an email");
      }
      if (!password || password == "") {
        return toast.error("Please enter an password");
      }

      const payload = {
        name,
        email,
        password,
      };
      const response = await axios.post(`${API}/auth/register`, payload);
      console.log(response.data);

      toast.success("User Registered successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-[#EAE0D5] text-[#5E503F] h-screen">
      <div className="w-md shadow-xl p-4 rounded-md bg-[#e8d8cc]">
        <h1 className="font-bold text-2xl text-center">Register</h1>

        <form className="flex flex-col gap-y-2 p-8" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="name">Name:</label>
            <input
              placeholder="John Doe"
              value={name}
              onChange={handleNameChange}
              type="text"
              id="name"
              className="border bg-[#e5e2df] rounded-md p-2 focus:outline-none text-sm"
            />
          </div>
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
            {isLoading ? <Loader /> : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
