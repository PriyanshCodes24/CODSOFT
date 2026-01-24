import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { motion } from "framer-motion";

const HomeHero = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <section className=" bg-[#EAE0D5] border-b border-[#d6cfc8]">
      <div className="py-20 px-4 text-center max-w-4xl mx-auto">
        <h1 className="font-bold text-3xl sm:text-5xl text-[#0A0908] py-16 sm:py-24 text-center leading-tight">
          Search. Apply. Get Hired.
        </h1>
        <p className="mt-4 text-[#5e3f3f] text-base sm:text-lg max-w-2xl mx-auto">
          Discover curated job opportunities and apply with confidence —
          everything you need in one place.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="bg-[#22333B] hover:bg-[#2F4450] transition text-white px-6 py-3 font-medium shadow-sm hover:shadow-md rounded-lg cursor-pointer"
            onClick={() => navigate("/jobs")}
          >
            Browse Jobs
          </motion.button>
          {!user && (
            <button
              className="border border-[#22333B] text-[#22333B] hover:bg-[#22333B] hover:text-white transition px-6 py-3 font-medium rounded-lg cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Get Strarted
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
