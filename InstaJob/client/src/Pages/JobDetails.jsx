import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const JobDetails = () => {
  const [jobDetails, setJobDetails] = useState(null);
  const API = import.meta.env.VITE_API;
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getJobDetails = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API}/jobs/${params.id}`);
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#EAE0D5] text-[#5E503F] ">
      <div className="shadow-xl rounded-xl">
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
              <li>Company : {jobDetails.company}</li>
              <li>Title : {jobDetails.title}</li>
              <li>Location : {jobDetails.location}</li>
              <li>Description : {jobDetails.description}</li>
              <li>Type : {jobDetails.type}</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
