import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useAuth } from "../Context/AuthContext";
import { formatDate } from "../Utils/formatDate";
import { buttonUi } from "../Utils/uiUtils";
import BackButton from "../Components/BackButton";

const JobDetails = () => {
  const [jobDetails, setJobDetails] = useState(null);
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [applyLoading, setApplyLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [hasApplied, setHasApplied] = useState(false);
  const [resume, setResume] = useState(null);

  const getJobDetails = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/jobs/get/${params.id}`);
      setJobDetails(response.data.jobDetails);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const hasAlreadyApplied = async () => {
    try {
      const response = await api.get(`/jobs/hasApplied/${params.id}`);
      console.log(response.data.hasApplied);
      setHasApplied(response.data.hasApplied);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getJobDetails();
    if (user?.role === "applicant") {
      hasAlreadyApplied();
    }
  }, [params.id, user]);

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Only PDF resumes are allowed");
      return;
    }

    setResume(file);
  };

  const handleApply = async () => {
    if (!resume) {
      return toast.error("Please upload resume (PDF)");
    }

    try {
      setApplyLoading(true);

      const formData = new FormData();
      formData.append("resume", resume);

      await api.post(`/applications/${params.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setHasApplied(true);
      toast.success("Applied successfully");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to apply");
    } finally {
      setApplyLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-gray-700 px-2 py-8">
      <div className="bg-white border border-gray-200 shadow-lg rounded-lg p-6 md:p-8 w-full max-w-6xl mx-auto py-10">
        <BackButton />
        <div className="flex flex-col px-4 py-8">
          <h1 className="text-3xl font-semibold text-gray-900">
            {jobDetails?.title}
          </h1>
          <p className=" mb-6 text-sm text-gray-500">{jobDetails?.location}</p>
          {isLoading ? (
            <h2 className=" text-lg text-[#22333b]">Loading... please wait</h2>
          ) : !jobDetails ? (
            <h2>Job not Found</h2>
          ) : (
            <ul className="space-y-4">
              <li>
                <span className="font-bold">Company :</span>{" "}
                {jobDetails.company}
              </li>
              <li>
                <span className="font-bold">Description :</span>{" "}
                {jobDetails.description}
              </li>
              <li>
                <span className="font-bold">Type :</span> {jobDetails.type}
              </li>
              <li>
                <span className="font-bold">Uploaded :</span>{" "}
                {formatDate(jobDetails.createdAt)}
              </li>
            </ul>
          )}
          {user?.role === "applicant" && !hasApplied && (
            <label className="block mt-5">
              <span className="text-sm font-medium text-gray-700">
                Resume (PDF only)
              </span>

              <div className="mt-2 flex items-center justify-center w-full">
                <label
                  htmlFor="resume"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <p className="text-sm text-gray-600">
                      {resume ? resume.name : "Click to upload your resume"}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      PDF only · Max 2MB
                    </p>
                  </div>

                  <input
                    id="resume"
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={handleResumeChange}
                  />
                </label>
              </div>
            </label>
          )}
          {user?.role === "applicant" && (
            <div className="flex justify-center mt-4">
              {hasApplied ? (
                <p className="text-green-600 mt-4">Application submitted</p>
              ) : (
                <button
                  className={`
                    ${buttonUi}
                     px-8 
                    ${
                      applyLoading || !resume ? "opacity-60" : "cursor-pointer"
                    }`}
                  onClick={handleApply}
                  disabled={applyLoading}
                >
                  {applyLoading ? "Applying..." : "Apply"}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
