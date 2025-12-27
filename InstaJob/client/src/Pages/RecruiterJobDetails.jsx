import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import api from "../api/axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const RecruiterJobDetails = () => {
  const [jobDetails, setJobDetails] = useState(null);
  const [applications, setApplications] = useState([]);
  const [jobLoading, setJobLoading] = useState(false);
  const [applicationsLoading, setApplicationsLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
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
        const response = await api.get(`/applications/get/${params.id}`);
        console.log(response);

        setApplications(response.data.applications);
      } catch (error) {
        console.log(error);
      } finally {
        setApplicationsLoading(false);
      }
    };

    getJobDetails();
    getApplications();
  }, []);

  const getDate = (mongoDate) => {
    const date = new Date(mongoDate);
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-[#EAE0D5] text-[#5E503F]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className=" flex items-center  gap-4 mb-6 ">
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="flex items-center text-sm hover:underline cursor-pointer"
          >
            <IoIosArrowBack className="mr-1" />
            Back
          </button>
          <div>
            <h1 className="text-lg font-semibold text-[#0A0908]">
              {jobLoading ? "Loading..." : jobDetails?.title}
            </h1>
            <p className="text-sm ">{!jobLoading && jobDetails?.location}</p>
          </div>
        </div>
        <div className="border border-[#5e503f48] rounded-md p-4 mb-8 shadow-sm">
          <h2 className=" text-sm font-semibold text-[#0A0908] mb-2">
            Job Overview
          </h2>

          {jobLoading ? (
            <p className="text-sm text-gray-500">Loading Job Details...</p>
          ) : !jobDetails ? (
            <p className="text-sm text-gray-500">
              Job Details could not be fetched!
            </p>
          ) : (
            <div className="space-y-1 text-sm">
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
          <h2 className="text-md font-semibold text-[#0A0908] mb-2">
            Applications ({applications.length})
          </h2>

          {applicationsLoading ? (
            <p className="text-sm text-gray-500">Loading Applications...</p>
          ) : applications.length === 0 ? (
            <p className="text-sm text-gray-500">No Applications yet</p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {applications.map((application) => (
                <div
                  key={application._id}
                  className="border border-[#5e503f48] rounded-md p-3 shadow-sm hover:shadow-md cursor-pointer "
                >
                  <p>
                    <span>Name: </span> {application?.applicant?.name}
                  </p>
                  <p>
                    <span>Email: </span> {application?.applicant?.email}
                  </p>
                  <p>
                    <span>Date: </span> {getDate(application?.createdAt)}
                  </p>
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
