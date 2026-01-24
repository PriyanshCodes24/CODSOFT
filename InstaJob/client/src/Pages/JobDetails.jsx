import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useAuth } from "../Context/AuthContext";
import { formatDate } from "../Utils/formatDate";
import { buttonUi } from "../Utils/uiClasses";
import { motion } from "framer-motion";
import BackButton from "../Components/BackButton";
import Loader from "../Components/Loader";
import Skeleton from "../Components/Skeleton";
import PageTransition from "../Components/PageTransition";

const JobDetails = () => {
  const [jobDetails, setJobDetails] = useState(null);
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [applyLoading, setApplyLoading] = useState(false);
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
    <PageTransition>
      <div className="min-h-screen bg-[#F8F9FA] text-gray-700 px-2 py-8 md:py-30">
        <motion.div
          initial={{ scale: 0.98 }}
          animate={{ scale: 1 }}
          layoutId={`job-${params.id}`}
          className="bg-white border border-gray-200 shadow-lg rounded-lg p-6 md:p-8 w-full max-w-5xl mx-auto py-10"
        >
          <BackButton />
          <div className="flex flex-col px-4 py-8">
            <>
              {isLoading ? (
                <div className="">
                  <Skeleton className="h-7 w-5/6 mb-3" />
                  <Skeleton className="h-4 w-1/2 mb-7" />
                  <Skeleton className="h-4 w-2/3 mb-6" />
                  <Skeleton className="h-4 w-3/4 mb-6" />
                  <Skeleton className="h-4 w-1/3 mb-6" />
                  <Skeleton className="h-4 w-2/3 mb-6" />
                </div>
              ) : !jobDetails ? (
                <h2>Job not Found</h2>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="text-3xl font-semibold text-gray-900">
                    {jobDetails?.title}
                  </h3>
                  <p className=" mb-6 text-sm text-gray-500">
                    {jobDetails?.location}
                  </p>

                  {/* job detais */}

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
                      <span className="font-bold">Type :</span>{" "}
                      {jobDetails.type}
                    </li>
                    <li>
                      <span className="font-bold">Uploaded :</span>{" "}
                      {formatDate(jobDetails.createdAt)}
                    </li>
                  </ul>
                </motion.div>
              )}

              {/* Resume upload */}

              {user?.role === "applicant" && !hasApplied && (
                <label className="block mt-5">
                  <span className="text-sm font-medium text-gray-700">
                    Resume (PDF only)
                  </span>

                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-2 flex items-center justify-center w-full"
                  >
                    <label
                      htmlFor="resume"
                      className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed  rounded-lg cursor-pointer  transition
                          ${resume ? "border-green-400 bg-green-50 " : "border-gray-300 bg-gray-50 hover:bg-gray-100"}
                        `}
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
                  </motion.div>
                </label>
              )}

              {/* apply button */}

              {user?.role === "applicant" && (
                <div className="flex justify-center mt-4">
                  {hasApplied ? (
                    <p className="text-green-600 mt-4">Application submitted</p>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                      className={`
                    px-8 mt-6 font-semibold flex items-center justify-center gap-2
                    ${buttonUi}
                    ${
                      applyLoading || !resume ? "opacity-60" : "cursor-pointer"
                    }`}
                      onClick={handleApply}
                      disabled={applyLoading}
                    >
                      {applyLoading && <Loader />}
                      {applyLoading ? "Applying..." : "Apply"}
                    </motion.button>
                  )}
                </div>
              )}
            </>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default JobDetails;
