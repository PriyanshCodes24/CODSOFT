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
import List from "../Components/List";
import { motion } from "framer-motion";
import { FiBriefcase } from "react-icons/fi";
import { TbBriefcaseOff } from "react-icons/tb";

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
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const getJobs = async () => {
    try {
      setSearchLoading(true);

      const response = await api.get(`/jobs?${searchParams.toString()}`);
      setJobList(response.data.jobs);
    } catch (error) {
      console.error(error);
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
      <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#020617]">
        <div className="max-w-6xl px-4 py-8 mx-auto">
          <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Job Listings
          </h1>

          {/* search filter */}
          <div className=" sticky top-0 z-50 bg-[#F8F9FA] dark:bg-[#020617] py-2  mb-6 border border-gray-200 dark:border-white/10 shadow-sm backdrop-blur supports-backdrop-filter:bg-white/10 dark:supports-backdrop-filter:bg-[#020617]/80">
            <form
              className="flex flex-wrap sm:flex-nowrap gap-2 px-2 items-stretch"
              onSubmit={handleSubmit}
            >
              <input
                id="job-title"
                type="text"
                aria-label="Job Title"
                name="q"
                className="w-full rounded-md p-2 text-sm sm:text-lg h-10 sm:h-12 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#22333B]"
                placeholder="Job Title"
                value={title}
                onChange={handleTitle}
              />
              <input
                id="job-location"
                type="text"
                aria-label="Job Location"
                name="loc"
                className="w-full sm:w-40 rounded-md p-2 text-sm sm:text-lg h-10 sm:h-12 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#22333B]"
                placeholder="Job Location"
                value={location}
                onChange={handleLocation}
              />
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                aria-label="Search"
                className={`w-full ${buttonUi} h-10 sm:h-12 sm:w-20 flex items-center justify-center sm:ml-0 ${
                  searchLoading ? "opacity-60" : "cursor-pointer"
                }`}
                type="submit"
                disabled={searchLoading}
              >
                {!searchLoading ? <FaSearch /> : <Loading />}
              </motion.button>
            </form>
          </div>

          {/* job list */}
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
            ) : jobList.length === 0 ? (
              <EmptyState
                icon={TbBriefcaseOff}
                title="No jobs found"
                description="Try changing keywords or removing filters"
                action={
                  <Link to="/jobs" className={`px-4 ${buttonUi}`}>
                    Clear filters
                  </Link>
                }
              />
            ) : (
              jobList.map((job) => (
                <Link to={`/jobs/${job._id}`} key={job._id}>
                  <List>
                    <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
                      {job?.title}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {job?.company} · {job?.location}
                    </p>
                    <br />
                    <p>
                      <span className="font-semibold">Created on</span> :{" "}
                      {formatDate(job.createdAt)}
                    </p>
                  </List>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Jobs;
