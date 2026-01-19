import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import { formatDate } from "../Utils/formatDate";
import { listCardUi } from "../Utils/uiClasses";
import Skeleton from "../Components/Skeleton";
import PageTransition from "../Components/PageTransition";

const RecruiterDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/jobs/my-jobs");
        console.log(response.data.jobs);

        setJobs(response.data.jobs);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#F8F9FA] text-gray-700">
        <div className="max-w-4xl px-4 py-8 mx-auto">
          <h1 className="text-center text-3xl mb-8 font-bold">Jobs Posted</h1>
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
            <p className="text-center text-sm text-gray-500">
              No jobs posted yet!
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {jobs.map((job) => (
                <Link
                  to={`/recruiter/jobs/${job._id}`}
                  key={job._id}
                  className={listCardUi}
                >
                  <p className="font-semibold text-lg text-gray-900">
                    {" "}
                    {job.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {job.company} · {job.location}
                  </p>
                  <br />
                  <p>
                    <span className="font-semibold">Type</span> : {job.type}
                  </p>
                  <p>
                    <span className="font-semibold">Created on</span> :{" "}
                    {formatDate(job.createdAt)}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default RecruiterDashboard;
