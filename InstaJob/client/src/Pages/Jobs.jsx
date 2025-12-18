import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import Loading from "../Components/Loader";

const Jobs = () => {
  const [jobList, setJobList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [title, setTitle] = useState(searchParams.get("q") || "");
  const [location, setLocation] = useState(searchParams.get("loc") || "");
  const API = import.meta.env.VITE_URI;
  const [searchLoading, setSearchLoading] = useState(false);

  const handleSubmit = (e) => {
    try {
      e.preventDefault();

      const params = new URLSearchParams(searchParams);

      if (title && title.trim() !== "") {
        params.set("q", title);
      } else {
        params.delete("q");
      }

      if (location && location.trim() !== "") {
        params.set("loc", location);
      } else {
        params.delete("loc");
      }

      setSearchParams(params);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getJobs = async () => {
    try {
      setSearchLoading(true);

      const response = await axios.get(
        `${API}/jobs?${searchParams.toString()}`
      );
      setJobList(response.data.jobs);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    getJobs();
  }, [searchParams]);

  useEffect(() => {
    try {
      setTitle(searchParams.get("q") || "");
      setLocation(searchParams.get("loc") || "");
    } catch (error) {
      console.log(error);
      toast.error(error.meassage);
    }
  }, [searchParams]);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleLocation = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div className="min-h-screen bg-[#EAE0D5] text-[#5E503F] ">
      <div className="max-w-6xl px-4 py-8 mx-auto">
        <h1 className="text-2xl font-bold mb-4">Job Listings</h1>

        <div
          id="jobs-search-placeholder"
          className=" sticky top-0 z-50 bg-[#EAE0D5] py-2 shadow-sm rounded mb-6"
        >
          <form
            className="flex flex-wrap sm:flex-nowrap gap-2 px-2 items-stretch"
            onSubmit={handleSubmit}
          >
            <input
              id="job-title"
              type="text"
              aria-label="Job Title"
              name="q"
              className="focus:outline-none border rounded-md text-sm sm:text-lg p-2 h-10 sm:h-12 flex-1 min-w-0 w-full"
              placeholder="Job Title"
              value={title}
              onChange={handleTitle}
            />
            <input
              id="job-location"
              type="text"
              aria-label="Job Location"
              name="loc"
              className="focus:outline-none border rounded-md text-sm sm:text-lg p-2 h-10 sm:h-12 w-full sm:w-40"
              placeholder="Job Location"
              value={location}
              onChange={handleLocation}
            />
            <button
              aria-label="Search"
              className="w-full h-10 sm:h-12 sm:w-12  shrink-0 bg-[#22333B] hover:bg-[#233c4d] hover:shadow-lg text-white rounded-md flex items-center justify-center px-3 cursor-pointer border-0 sm:ml-0"
              type="submit"
            >
              {!searchLoading ? <FaSearch /> : <Loading />}
            </button>
          </form>
        </div>

        <div id="jobs-list" className="grid grid-cols-1 gap-4">
          {jobList.length !== 0 ? (
            jobList.map((job) => (
              <div key={job._id} className="border rounded p-4 text-gray-600">
                <p>
                  <b>Title</b> : {job.title}
                </p>
                <p>
                  <b>Location</b> : {job.location}
                </p>
              </div>
            ))
          ) : (
            <h1 className="font-bold text-2xl text-center rounded p-4 text-gray-600">
              No jobs found
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
