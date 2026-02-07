import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { motion } from "framer-motion";
import { buttonUi } from "../Utils/uiClasses";

const HomeHero = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-[#EAE0D5] dark:bg-[#020617] border-b border-[#d6cfc8] dark:border-white/10">
      <div className="hidden dark:block absolute inset-0 bg-linear-to-b to-transparent dark:from-white/5 pointer-events-none" />

      <div className="py-20 px-4 text-center max-w-4xl mx-auto">
        {/* heading */}
        <h1 className=" font-bold text-3xl sm:text-5xl text-gray-900 dark:text-gray-100 py-16 sm:py-24 text-center leading-tight">
          Search. Apply. Get Hired.
        </h1>

        {/* subtext */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mt-6 text-base text-gray-600 dark:text-gray-400 sm:text-lg max-w-2xl mx-auto"
        >
          Discover curated job opportunities and apply with confidence —
          everything you need in one place.
        </motion.p>

        {/* buttons */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-10 flex justify-center gap-4 flex-wrap"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={`px-8 py-3 text-lg ${buttonUi}`}
            onClick={() => navigate("/jobs")}
          >
            Browse Jobs
          </motion.button>
          {!user && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="px-8 py-3 text-lg font-medium rounded-md border border-[#22333B] dark:border-white/20 hover:border-[#22333B] text-[#22333B] dark:text-gray-100 hover:bg-[#22333B] hover:text-white dark:hover:bg-[#1e293b] transition-colors cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Get Strarted
            </motion.button>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default HomeHero;
