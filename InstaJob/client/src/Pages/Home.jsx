import { useNavigate } from "react-router-dom";
import HomeHero from "../Components/HomeHero";
import PageTransition from "../Components/PageTransition";

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
            <button
              key={cat.id}
              onClick={() => go(cat.label)}
              className="flex justify-center items-center bg-[#22333B] hover:bg-[#233a4d] text-white rounded-lg p-6 cursor-pointer gap-2 hover:shadow-lg transition-colors  duration-200 font-medium text-lg"
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Home;
