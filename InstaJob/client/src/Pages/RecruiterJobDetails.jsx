import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import StatusBadge from "../Components/StatusBadge";
import { formatDate } from "../Utils/formatDate";
import { statusButtonUi } from "../Utils/uiUtils";
import BackButton from "../Components/BackButton";

const RecruiterJobDetails = () => {
  const [jobDetails, setJobDetails] = useState(null);
  const [applications, setApplications] = useState([]);
  const [jobLoading, setJobLoading] = useState(false);
  const [applicationsLoading, setApplicationsLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const getJobDetails = async () => {
    try {
      setJobLoading(true);
      const response = await api.get(`/jobs/get/${params.id}`);
      setJobDetails(response.data.jobDetails);
    } catch (error) {
      console.log(error);
    } finally {
      setJobLoading(false);
    }
  };
  const getApplications = async () => {
    try {
      setApplicationsLoading(true);
      const response = await api.get(
        `/applications/recruiter/get/${params.id}`
      );
      console.log(response);

      setApplications(response.data.applications);
    } catch (error) {
      console.log(error);
    } finally {
      setApplicationsLoading(false);
    }
  };

  useEffect(() => {
    getJobDetails();
    getApplications();
  }, [params.id]);

  const changeStatus = async (status, id) => {
    try {
      const response = await api.patch(`applications/patch/${id}/${status}`);
      console.log(response?.data);
      toast.success(response?.data?.message);
      await getApplications();
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || `application could not be ${status}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-gray-700">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className=" flex items-center gap-4 mb-6 ">
          <BackButton />
          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              {jobLoading ? "Loading..." : jobDetails?.title}
            </h1>
            <p className="text-sm ">{!jobLoading && jobDetails?.location}</p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-8 shadow-sm">
          <h2 className="text-base font-semibold text-gray-900 mb-2">
            Job Overview
          </h2>

          {jobLoading ? (
            <p className="text-sm text-gray-500">Loading... please wait</p>
          ) : !jobDetails ? (
            <p className="text-sm text-gray-500">
              Job Details could not be fetched!
            </p>
          ) : (
            <div className=" space-y-1 text-sm">
              <p>
                <span className="font-medium">Company: </span>
                {jobDetails?.company}
              </p>
              <p>
                <span className="font-medium">Title: </span>
                {jobDetails?.title}
              </p>
              <p>
                <span className="font-medium">Location: </span>
                {jobDetails?.location}
              </p>
              <p>
                <span className="font-medium">Type: </span>
                {jobDetails?.type}
              </p>
            </div>
          )}
        </div>
        <div>
          <h2 className="text-md font-semibold text-gray-900">
            Applications ({applications.length})
          </h2>
          <p className="mb-4 text-sm text-gray-500">
            Review and manage applications for this job
          </p>

          {applicationsLoading ? (
            <p className="text-sm text-gray-500">Loading... please wait</p>
          ) : applications.length === 0 ? (
            <p className="text-sm text-gray-500">No Applications yet</p>
          ) : (
            <div className="bg-white grid grid-cols-1 gap-4">
              {applications.map((application) => (
                <div
                  key={application._id}
                  className="border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md"
                >
                  <p>
                    <span className="font-semibold">Name: </span>{" "}
                    {application?.applicant?.name}
                  </p>
                  <p>
                    <span className="font-semibold">Email: </span>{" "}
                    {application?.applicant?.email}
                  </p>
                  <p>
                    <span className="font-semibold">Date: </span>{" "}
                    {formatDate(application?.createdAt)}
                  </p>
                  <p>
                    <span className="font-semibold">Status: </span>{" "}
                    <StatusBadge status={application.status} />
                  </p>
                  <a
                    href={`http://localhost:2000/${application.resume}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline text-sm"
                  >
                    Download Resume
                  </a>

                  <div className="flex gap-x-2 mt-2">
                    {application.status === "pending" && (
                      <button
                        onClick={() => {
                          changeStatus("accepted", application._id);
                        }}
                        disabled={applicationsLoading}
                        className={`${statusButtonUi} bg-green-600 hover:bg-green-700 ${
                          applicationsLoading && "opacity-60"
                        }`}
                      >
                        Accept
                      </button>
                    )}
                    {application.status === "pending" && (
                      <button
                        onClick={() => {
                          changeStatus("rejected", application._id);
                        }}
                        disabled={applicationsLoading}
                        className={`${statusButtonUi} bg-red-600 hover:bg-red-700 ${
                          applicationsLoading && "opacity-60"
                        }`}
                      >
                        Reject
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecruiterJobDetails;
