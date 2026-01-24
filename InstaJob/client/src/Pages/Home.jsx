import { useNavigate } from "react-router-dom";
import HomeHero from "../Components/HomeHero";
import PageTransition from "../Components/PageTransition";
import { motion } from "framer-motion";

const Home = () => {
  const categories = [
    { id: "dev", label: "Development" },
    { id: "design", label: "Design" },
    { id: "marketing", label: "Marketing" },
    { id: "data", label: "Data" },
    { id: "product", label: "Product" },
    { id: "devops", label: "DevOps" },
  ];
  const navigate = useNavigate();
  const go = (label) => navigate(`/jobs?q=${encodeURIComponent(label)}`);

  return (
    <PageTransition>
      <div className="">
        <HomeHero />

        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4 gap-4 mt-10">
          {categories.map((cat) => (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              key={cat.id}
              onClick={() => go(cat.label)}
              className="flex justify-center items-center bg-[#22333B] hover:bg-[#2C3E46] text-white rounded-lg p-6 cursor-pointer gap-2 hover:shadow-lg transition-colors  duration-200 font-medium text-lg"
            >
              {cat.label}
            </motion.button>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Home;
