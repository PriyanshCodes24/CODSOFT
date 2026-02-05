import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import { formatDate } from "../Utils/formatDate";
import { buttonUi, listCardUi } from "../Utils/uiClasses";
import Skeleton from "../Components/Skeleton";
import PageTransition from "../Components/PageTransition";
import EmptyState from "../Components/EmptyState";
import List from "../Components/List";
import { AnimatePresence, motion } from "framer-motion";
import { RiDeleteBin6Fill, RiDeleteBin6Line } from "react-icons/ri";
import toast from "react-hot-toast";
import { TbBriefcaseOff } from "react-icons/tb";

const RecruiterDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/jobs/my-jobs");
        setJobs(response.data.jobs);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this job permanently",
    );
    if (!confirm) return;
    try {
      await api.delete(`/jobs/${jobId}`);
      setJobs((prev) => prev.filter((job) => job._id !== jobId));
      toast.success("Job deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to delete the Job");
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen">
        <div className="max-w-4xl px-4 py-8 mx-auto">
          <div className="text-center mb-8 ">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Jobs Posted
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Track the jobs you've posted
            </p>
          </div>
          <AnimatePresence mode="wait">
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className={listCardUi}>
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="mt-8 h-4 w-2/3" />
                    <Skeleton className="mt-2 h-4 w-1/3" />
                  </div>
                ))}
              </div>
            ) : jobs.length === 0 ? (
              <EmptyState
                icon={TbBriefcaseOff}
                title="No jobs posted yet!"
                description="Once you post jobs, thehy will appear here"
                action={
                  <Link to="/post" className={`px-6 ${buttonUi}`}>
                    Post a job
                  </Link>
                }
              />
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 gap-4"
              >
                {jobs.map((job) => (
                  <List
                    key={job._id}
                    className="flex justify-between items-start"
                  >
                    <Link to={`/recruiter/jobs/${job._id}`} key={job._id}>
                      <div>
                        <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                          {" "}
                          {job.title}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {job.company} · {job.location}
                        </p>
                        <br />
                        <p>
                          <span className="font-semibold">Type</span> :{" "}
                          {job.type}
                        </p>
                        <p>
                          <span className="font-semibold">Created on</span> :{" "}
                          {formatDate(job.createdAt)}
                        </p>
                      </div>
                    </Link>
                    <button
                      title="delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(job._id);
                      }}
                      className="relative group cursor-pointer mt-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500"
                    >
                      <RiDeleteBin6Line className="opacity-100 group-hover:opacity-0 transition-opacity text-xl duration-200" />
                      <RiDeleteBin6Fill className="absolute top-0 opacity-0 group-hover:opacity-100 transition-opacity text-xl duration-200" />
                    </button>
                  </List>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
};

export default RecruiterDashboard;
