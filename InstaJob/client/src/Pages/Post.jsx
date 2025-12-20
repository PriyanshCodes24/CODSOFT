import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Post = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");
  const typeOptions = ["Full-time", "Internship", "Remote"];
  const [type, setType] = useState("Full-time");
  const [description, setDescription] = useState("");
  const API = import.meta.env.VITE_API;
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

      const payload = {
        title,
        location,
        company,
        type,
        description,
      };

      const response = await axios.post(`${API}/jobs`, payload);
      console.log(response);
      navigate("/jobs");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-[#EAE0D5] text-[#5E503F]">
      <div className="w-md bg-[#e8d8cc] shadow-xl rounded-md p-4">
        <h1 className="font-bold text-2xl mb-8 text-center">Post a Job</h1>
        <form className="flex flex-col gap-y-2 p-8 " onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="text-sm" htmlFor="title">
              Title:{" "}
            </label>
            <input
              value={title}
              id="title"
              placeholder="title"
              type="text"
              className="bg-[#e5e2df] border focus:outline-none rounded-md p-2 text-sm"
              onChange={handleTitleChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm" htmlFor="location">
              Location:{" "}
            </label>
            <input
              value={location}
              id="location"
              placeholder="location"
              type="text"
              className="bg-[#e5e2df] border focus:outline-none rounded-md p-2 text-sm"
              onChange={handleLocationChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm" htmlFor="company">
              Company:{" "}
            </label>
            <input
              value={company}
              id="company"
              placeholder="company"
              type="text"
              className="bg-[#e5e2df] border focus:outline-none rounded-md p-2 text-sm"
              onChange={handleCompanyChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm" htmlFor="type">
              Type:{" "}
            </label>
            <select
              value={type}
              id="type"
              placeholder="type"
              type="dropdown"
              className="bg-[#e5e2df] border rounded-md p-2 text-sm "
              onChange={handleTypeChange}
            >
              {typeOptions.map((option) => (
                <option
                  className="bg-[#e5e2df]"
                  key={option}
                  label={option}
                  value={option}
                ></option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-sm" htmlFor="description">
              Description:{" "}
            </label>
            <textarea
              value={description}
              id="description"
              placeholder="description"
              type="text"
              className="bg-[#e5e2df] border focus:outline-none rounded-md p-2 text-sm"
              onChange={handleDescriptionChange}
            />
          </div>
          <button
            type="submit"
            className="mt-4 hover:shadow-lg bg-[#22333B] focus:bg-[#233c4d] hover:bg-[#233c4d] text-white cursor-pointer border-0 rounded-md p-3"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Post;
