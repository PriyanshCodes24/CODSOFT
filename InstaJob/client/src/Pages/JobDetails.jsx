import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import api from "../api/axios";
import toast from "react-hot-toast";

const JobDetails = () => {
  const [jobDetails, setJobDetails] = useState(null);
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getJobDetails = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/jobs/${params.id}`);
      setJobDetails(response.data.jobDetails);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getJobDetails();
  }, [params.id]);

  const handleApply = async () => {
    try {
      await api.post(`/apply/${params.id}`);
      toast.success("Applied successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Failed to apply");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#EAE0D5] text-[#5E503F] ">
      <div className="shadow-xl rounded-xl p-4 w-2xs lg:w-lg">
        <div className="flex cursor-pointer" onClick={() => navigate(-1)}>
          {<IoIosArrowBack className="translate-1" />}Back
        </div>
        <div className="flex flex-col max-w-6xl px-4 py-8 mx-auto ">
          <h1 className="text-2xl font-bold mb-4">Job Details</h1>
          {isLoading ? (
            <h2 className=" text-center text-lg text-[#22333b]">Loading...</h2>
          ) : !jobDetails ? (
            <h2>Job not Found</h2>
          ) : (
            <ul className="space-y-4">
              <li>
                <b>Company :</b> {jobDetails.company}
              </li>
              <li>
                <b>Title :</b> {jobDetails.title}
              </li>
              <li>
                <b>Location :</b> {jobDetails.location}
              </li>
              <li>
                <b>Description :</b> {jobDetails.description}
              </li>
              <li>
                <b>Type :</b> {jobDetails.type}
              </li>
            </ul>
          )}
          <div className="flex justify-center mt-4">
            <button
              className="mt-4 hover:shadow-lg bg-[#22333B] focus:bg-[#233c4d] hover:bg-[#233c4d] text-white cursor-pointer border-0 rounded-md px-8 py-2"
              onClick={handleApply}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
