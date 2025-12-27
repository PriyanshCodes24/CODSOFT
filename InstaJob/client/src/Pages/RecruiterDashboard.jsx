import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get("/jobs/my-jobs");
        console.log(response.data.jobs);

        setJobs(response.data.jobs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-[#EAE0D5] text-[#5E503F]">
      <div className="max-w-6xl px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 gap-4">
          {jobs.map((job) => (
            <Link
              to={`/recruiter/jobs/${job._id}`}
              key={job._id}
              className="border border-[#5e503f48] shadow-sm rounded-md p-4 text-gray-600 cursor-pointer hover:shadow-md"
            >
              <p>
                <b>Title</b> : {job.title}
              </p>
              <p>
                <b>Location</b> : {job.location}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
