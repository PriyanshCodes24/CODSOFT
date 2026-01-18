import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";
import { buttonUi } from "../Utils/uiUtils";
import BackButton from "../Components/BackButton";

const Post = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");
  const typeOptions = ["Full-time", "Internship", "Remote"];
  const [type, setType] = useState("Full-time");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };
  const handleCompanyChange = (e) => {
    setCompany(e.target.value);
  };
  const handleTypeChange = (e) => {
    setType(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!title.trim()) return toast.error("Title is required");
      if (!location.trim()) return toast.error("Location is required");
      if (!company.trim()) return toast.error("Company is required");
      if (!description.trim()) return toast.error("Description is required");

      setIsLoading(true);
      const payload = {
        title,
        location,
        company,
        type,
        description,
      };

      const response = await api.post(`/jobs`, payload);
      console.log(response);
      toast.success("job posted successfully");
      navigate("/recruiter/dashboard");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F8F9FA] text-gray-700 px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 shadow-lg rounded-lg p-6">
        <BackButton />
        <h1 className="font-bold text-2xl m-4 text-center">Post a Job</h1>
        <form className="space-y-4 " onSubmit={handleSubmit}>
          <div>
            <label className="text-sm text-gray-700 font-medium">Title: </label>
            <input
              value={title}
              placeholder="Frontend Developer"
              type="text"
              className="w-full border focus:outline-none rounded-md p-2 text-sm focus:ring-1 focus:ring-[#22333B] mt-1"
              onChange={handleTitleChange}
            />
          </div>
          <div>
            <label className="text-sm text-gray-700 font-medium">
              Location:{" "}
            </label>
            <input
              value={location}
              placeholder="Remote / Bangalore"
              type="text"
              className="w-full border focus:outline-none rounded-md p-2 text-sm focus:ring-1 focus:ring-[#22333B] mt-1"
              onChange={handleLocationChange}
            />
          </div>
          <div>
            <label className="text-sm text-gray-700 font-medium">
              Company:{" "}
            </label>
            <input
              value={company}
              placeholder="InstaJob"
              type="text"
              className="w-full border focus:outline-none rounded-md p-2 text-sm focus:ring-1 focus:ring-[#22333B] mt-1"
              onChange={handleCompanyChange}
            />
          </div>
          <div>
            <label className="text-sm text-gray-700 font-medium">Type: </label>
            <select
              value={type}
              placeholder="type"
              type="dropdown"
              className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#22333B] mt-1"
              onChange={handleTypeChange}
            >
              {typeOptions.map((option) => (
                <option
                  className=""
                  key={option}
                  label={option}
                  value={option}
                ></option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-700 font-medium">
              Description:{" "}
            </label>
            <textarea
              value={description}
              placeholder="description"
              rows={4}
              type="text"
              className="w-full border focus:outline-none rounded-md p-2 text-sm focus:ring-1 focus:ring-[#22333B] mt-1"
              onChange={handleDescriptionChange}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full p-3 ${buttonUi} ${
              isLoading ? "opacity-60" : "cursor-pointer"
            }`}
          >
            {isLoading ? "Posting..." : "Post Job"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Post;
