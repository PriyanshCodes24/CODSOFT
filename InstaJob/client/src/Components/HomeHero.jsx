import { useNavigate } from "react-router-dom";

const HomeHero = () => {
  const navigate = useNavigate();
  return (
    <div className="py-16 sm:py-24 text-center bg-[#EAE0D5]">
      <h1 className="font-bold text-2xl sm:text-4xl text-[#0A0908]">
        Search. Apply. Get Hired.
      </h1>
      <p className="text-[#5E503F] text-base m-3">
        Browse hand-picked roles tailored to your skills.
      </p>
      <button
        className="mt-4 bg-[#22333B] hover:bg-[#2F4450] transition text-gray-200 px-6 py-2 rounded-lg cursor-pointer"
        onClick={() => navigate("/jobs")}
      >
        Browse Jobs
      </button>
    </div>
  );
};

export default HomeHero;
