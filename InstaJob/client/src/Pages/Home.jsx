import { useNavigate } from "react-router-dom";
import HomeHero from "../Components/HomeHero";

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
    <div className="">
      <HomeHero />

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4 gap-4 mt-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => go(cat.label)}
            className="flex flex-col items-center bg-[#22333B] hover:bg-[#233a4d] text-white rounded-lg border p-4 cursor-pointer gap-2 hover:shadow-md transition "
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
