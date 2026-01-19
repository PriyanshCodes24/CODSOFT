import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import { useSearchParams, Link } from "react-router-dom";
import Loading from "../Components/Loader";
import api from "../api/axios";
import { formatDate } from "../Utils/formatDate";
import { buttonUi, listCardUi } from "../Utils/uiClasses";
import Skeleton from "../Components/Skeleton";
import EmptyState from "../Components/EmptyState";
import PageTransition from "../Components/PageTransition";
import { motion } from "framer-motion";

const Jobs = () => {
  const [jobList, setJobList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [title, setTitle] = useState(searchParams.get("q") || "");
  const [location, setLocation] = useState(searchParams.get("loc") || "");
  const [searchLoading, setSearchLoading] = useState(true);

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
    <PageTransition>
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
                className={`w-full ${buttonUi} h-10 sm:h-12 sm:w-12 flex items-center justify-center sm:ml-0 ${
                  searchLoading ? "opacity-60" : "cursor-pointer"
                }`}
                type="submit"
                disabled={searchLoading}
              >
                {!searchLoading ? <FaSearch /> : <Loading />}
              </button>
            </form>
          </div>

          <div id="jobs-list" className="grid grid-cols-1 gap-4">
            {searchLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={listCardUi}>
                    <Skeleton className="h-5 w-2/3 mb-2" />
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="mt-8 h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : jobList.length !== 0 ? (
              jobList.map((job) => (
                <Link to={`/jobs/${job._id}`} key={job._id}>
                  <motion.div
                    layoutId={`job-${job._id}`}
                    className={listCardUi}
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
                  </motion.div>
                </Link>
              ))
            ) : (
              <EmptyState
                title="No jobs found"
                description="Try changing keywords or removing filters"
                action={
                  <Link to="/jobs" className={`px-4 ${buttonUi}`}>
                    Clear filters
                  </Link>
                }
              />
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Jobs;
