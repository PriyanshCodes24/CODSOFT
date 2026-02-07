import { useEffect, useRef, useState } from "react";
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
import { MdOutlineFileUpload } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa";

const JobDetails = () => {
  const [jobDetails, setJobDetails] = useState(null);
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [applyLoading, setApplyLoading] = useState(false);
  const { user } = useAuth();
  const [hasApplied, setHasApplied] = useState(false);
  const [resume, setResume] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const getJobDetails = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/jobs/get/${params.id}`);
      setJobDetails(response.data.jobDetails);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const hasAlreadyApplied = async () => {
    try {
      const response = await api.get(`/jobs/hasApplied/${params.id}`);
      setHasApplied(response.data.hasApplied);
    } catch (error) {
      console.error(error);
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
      setError("Only PDF resumes are allowed.");
      // toast.error("Only PDF resumes are allowed");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("File size is too large. Maximum size is 2MB.");
      return;
    }
    setError(null);

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
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to apply");
    } finally {
      setApplyLoading(false);
    }
  };

  const handleRemoveResume = (e) => {
    e.preventDefault();
    setResume(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Only PDF resumes are allowed.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("File size is too large. Maximum size is 2MB.");
      return;
    }

    setError(null);
    setResume(file);
  };

  return (
    <PageTransition>
      <div className="min-h-screen px-2 py-8 md:py-30">
        <motion.div className="bg-white dark:bg-[#020617] border border-gray-200 dark:border-gray-800 shadow-lg rounded-lg p-6 md:p-8 w-full max-w-5xl mx-auto py-10">
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.05 }}
                >
                  <h3 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
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
                      <span className="font-bold block mb-1">
                        Description :
                      </span>{" "}
                      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                        {jobDetails.description}
                      </p>
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

              <hr className="my-6 border-gray-200 dark:border-gray-800" />

              {user?.role !== "applicant" && (
                <p className="text-center mt-8 text-red-500 dark:text-red-600">
                  Only applicants can apply.
                </p>
              )}
              {/* Resume upload */}

              {user?.role === "applicant" && !hasApplied && (
                <div className="mt-8">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">
                    Resume (PDF only)
                  </label>
                  <motion.label
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    htmlFor="resume"
                    onDrop={handleDrop}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    className={`relative w-full h-36 flex flex-col justify-center items-center rounded-lg cursor-pointer border-2 border-dashed transition 
                      ${isDragging ? "border-blue-400 bg-blue-50 dark:bg-blue-900/30" : resume ? "border-green-400 bg-green-50 dark:bg-green-950/40" : "border-gray-300 dark:border-gray-700  bg-gray-50 dark:bg-gray-950/30 hover:bg-gray-100 dark:hover:bg-gray-900"}
                      `}
                  >
                    <div className="flex flex-col items-center text-center px-4">
                      <div className={`mb-2`}>
                        {resume ? (
                          <FaFilePdf size={18} />
                        ) : (
                          <MdOutlineFileUpload size={18} />
                        )}
                      </div>

                      <p className="text-sm font-medium">
                        {isDragging
                          ? "Drop your resume here"
                          : resume
                            ? resume.name
                            : "Click or drag to upload your resume"}
                      </p>
                      <p className="text-xs text-gray-400 mt-1 ">
                        {resume
                          ? (resume?.size / (1024 * 1024)).toFixed(1) + " MB"
                          : "PDF only · Max 2MB"}
                      </p>
                    </div>

                    <input
                      id="resume"
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={handleResumeChange}
                    />
                    {resume && (
                      <button
                        onClick={handleRemoveResume}
                        className="text-xs text-gray-600 dark:text-gray-300 mt-3 hover:text-gray-800 dark:hover:text-gray-100 hover:underline hover:underline-offset-2 cursor-pointer"
                      >
                        Remove
                      </button>
                    )}
                  </motion.label>
                  {error && (
                    <div className="text-center mt-2 text-sm text-red-600 bg-red-100 dark:bg-red-900/30 rounded-md px-3 py-1">
                      {error}
                    </div>
                  )}
                </div>
              )}

              {/* apply button */}

              {user?.role === "applicant" && (
                <div className="flex justify-center mt-4">
                  {hasApplied ? (
                    <p className="text-green-600 mt-8 text-sm font-medium">
                      ✓ Application submitted
                    </p>
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
