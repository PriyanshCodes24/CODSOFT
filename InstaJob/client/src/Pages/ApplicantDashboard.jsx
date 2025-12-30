import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import StatusBadge from "../Components/StatusBadge";
import { formatDate } from "../Utils/formatDate";

const ApplicantDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [applicationsLoading, setApplicationsLoading] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setApplicationsLoading(true);
        const response = await api.get("/applications/applicant/get");
        console.log(response.data.applications);

        setApplications(response.data.applications);
      } catch (error) {
        console.log(error);
      } finally {
        setApplicationsLoading(false);
      }
    };
    fetchApplications();
  }, []);

  return (
    <div className="min-h-screen bg-[#EAE0D5] text-[#5E503F]">
      <div className="max-w-6xl px-4 py-8 mx-auto">
        <h1 className="text-center text-3xl mb-8 font-bold">My Applications</h1>
        {applicationsLoading ? (
          <p className=" text-center text-gray-500">Loading Applications...</p>
        ) : applications.length === 0 ? (
          <p className=" text-center text-sm text-gray-500">
            No Applications yet
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {applications.map((application) => {
              if (!application.job) {
                return null;
              }
              return (
                <Link
                  to={`/jobs/${application.job._id}`}
                  key={application._id}
                  className="border border-[#5e503f48] shadow-sm rounded-md p-4 text-gray-600 cursor-pointer hover:shadow-md"
                >
                  <p className="font-bold text-gray-700">
                    {application?.job?.title}
                  </p>
                  <p>
                    {application?.job?.company} · {application?.job?.location}
                  </p>
                  <br />
                  <p>
                    <span className="font-semibold">applied On</span> :{" "}
                    {formatDate(application?.createdAt)}
                  </p>
                  <p>
                    <span className="font-semibold">Status</span> :{" "}
                    <StatusBadge status={application.status} />
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicantDashboard;
