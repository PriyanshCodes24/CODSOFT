import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import StatusBadge from "../Components/StatusBadge";
import { formatDate } from "../Utils/formatDate";
import { buttonUi, listCardUi } from "../Utils/uiClasses";
import Skeleton from "../Components/Skeleton";
import EmptyState from "../Components/EmptyState";

const ApplicantDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [applicationsLoading, setApplicationsLoading] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setApplicationsLoading(true);
        const response = await api.get("/applications/applicant/get");

        setApplications(response.data.applications);
      } catch (error) {
        console.error(error);
        toast.error(error?.response?.data?.message);
      } finally {
        setApplicationsLoading(false);
      }
    };
    fetchApplications();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-gray-700">
      <div className="max-w-4xl px-4 py-8 mx-auto">
        <h1 className="text-center text-3xl mb-8 font-bold">My Applications</h1>
        {applicationsLoading ? (
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
        ) : applications.length === 0 ? (
          <EmptyState
            title="No applications yet"
            description="Once you apply to jobs, they'll appear here."
            action={
              <Link to="/jobs" className={`px-6 ${buttonUi}`}>
                Browse jobs
              </Link>
            }
          />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4">
              {applications.map((application) => {
                if (!application.job) {
                  return null;
                }
                return (
                  <Link
                    to={`/jobs/${application.job._id}`}
                    key={application._id}
                    className={listCardUi}
                  >
                    <p className="font-semibold text-gray-900 text-lg">
                      {application?.job?.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      {application?.job?.company} · {application?.job?.location}
                    </p>
                    <br />
                    <p>
                      <span className="font-semibold">Applied on</span> :{" "}
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
          </>
        )}
      </div>
    </div>
  );
};

export default ApplicantDashboard;
