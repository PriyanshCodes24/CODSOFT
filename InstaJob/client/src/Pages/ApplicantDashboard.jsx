import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import StatusBadge from "../Components/StatusBadge";
import { formatDate } from "../Utils/formatDate";
import { buttonUi, listCardUi } from "../Utils/uiClasses";
import Skeleton from "../Components/Skeleton";
import EmptyState from "../Components/EmptyState";
import PageTransition from "../Components/PageTransition";
import { motion } from "framer-motion";
import ApplicationSection from "../Components/ApplicationSection";

const ApplicantDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [applicationsLoading, setApplicationsLoading] = useState(false);
  const [filter, setFilter] = useState();

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

  const handleFilter = (e) => {
    console.log(e.target.value);
    setFilter(e.target.value);
  };

  const pendingApps = applications.filter(
    (app) => app.status === "pending" && app.job,
  );
  const acceptedApps = applications.filter(
    (app) => app.status === "accepted" && app.job,
  );
  const rejectedApps = applications.filter(
    (app) => app.status === "rejected" && app.job,
  );

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#F8F9FA] text-gray-700">
        <div className="max-w-4xl px-4 py-8 mx-auto">
          {/* header */}
          <div className="text-center mb-8">
            <h1 className="text-gray-900 text-3xl font-bold">
              My Applications
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Track the status of jobs you've applied to.
            </p>
          </div>

          {/* filter */}
          {/* <div className="mb-2">
            <select
              onChange={handleFilter}
              className="text-center text-gray-500 bg-white rounded-md border border-gray-200"
            >
              <option value="">Filter</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div> */}

          {/* applications */}
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
            // <>
            //   <div className="grid grid-cols-1 gap-4">
            //     {applications.map((application) => {
            //       if (!application.job) {
            //         return null;
            //       }
            //       return (
            //         <Link
            //           to={`/jobs/${application.job._id}`}
            //           key={application._id}
            //         >
            //           <motion.div
            //             layoutId={`job-${application.job._id}`}
            //             className={listCardUi}
            //           >
            //             <h3 className="font-semibold text-gray-900 text-lg">
            //               {application?.job?.title}
            //             </h3>
            //             <p className="text-sm text-gray-500">
            //               {application?.job?.company} ·{" "}
            //               {application?.job?.location}
            //             </p>
            //             <br />
            //             <p>
            //               <span className="font-semibold">Applied on</span> :{" "}
            //               {formatDate(application?.createdAt)}
            //             </p>
            //             <p>
            //               <span className="font-semibold">Status</span> :{" "}
            //               <StatusBadge status={application.status} />
            //             </p>
            //           </motion.div>
            //         </Link>
            //       );
            //     })}
            //   </div>
            // </>
            <>
              <ApplicationSection
                title="Pending Applications"
                items={pendingApps}
              />
              <ApplicationSection
                title="Accepted Applications"
                items={acceptedApps}
              />
              <ApplicationSection
                title="Rejected Applications"
                items={rejectedApps}
              />
            </>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default ApplicantDashboard;
