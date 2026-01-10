import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import { useSearchParams, Link } from "react-router-dom";
import Loading from "../Components/Loader";
import api from "../api/axios";
import { formatDate } from "../Utils/formatDate";

const Jobs = () => {
  const [jobList, setJobList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [title, setTitle] = useState(searchParams.get("q") || "");
  const [location, setLocation] = useState(searchParams.get("loc") || "");
  const [searchLoading, setSearchLoading] = useState(false);
  // const [Loading, setLoading] = useState(false);

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
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const getJobs = async () => {
    try {
      setSearchLoading(true);

      const response = await api.get(`/jobs?${searchParams.toString()}`);
      setJobList(response.data.jobs);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    getJobs();
  }, [searchParams]);

  useEffect(() => {
    setTitle(searchParams.get("q") || "");
    setLocation(searchParams.get("loc") || "");
  }, [searchParams]);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleLocation = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-gray-700 ">
      <div className="max-w-6xl px-4 py-8 mx-auto">
        <h1 className="text-2xl font-bold mb-4">Job Listings</h1>

        <div
          id="jobs-search-placeholder"
          className=" sticky top-0 z-50 bg-[#F8F9FA] py-2 shadow-md rounded-md mb-6"
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
              className={`w-full h-10 sm:h-12 sm:w-12  shrink-0 bg-[#22333B] hover:bg-[#233c4d] hover:shadow-md text-white rounded-md flex items-center justify-center px-3 ${
                searchLoading ? "opacity-60" : "cursor-pointer"
              } border-0 sm:ml-0`}
              type="submit"
              disabled={searchLoading}
            >
              {!searchLoading ? <FaSearch /> : <Loading />}
            </button>
          </form>
        </div>

        <div id="jobs-list" className="grid grid-cols-1 gap-4">
          {searchLoading ? (
            <p className="font-bold text-2xl text-center rounded p-4 text-gray-600">
              Loading jobs...
            </p>
          ) : jobList.length !== 0 ? (
            jobList.map((job) => (
              <Link
                to={`/jobs/${job._id}`}
                key={job._id}
                className="border border-gray-200 shadow-md rounded-md hover:shadow-sm p-4 text-gray-600 cursor-pointer "
              >
                <p className="font-semibold text-gray-900 text-lg">
                  {job?.title}
                </p>
                <p className="text-sm text-gray-500">
                  {job?.company} · {job?.location}
                </p>
                <br />
                <p>
                  <span className="font-semibold">Created on</span> :{" "}
                  {formatDate(job.createdAt)}
                </p>
              </Link>
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
