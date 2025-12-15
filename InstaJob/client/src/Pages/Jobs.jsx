import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

const Jobs = () => {
  const jobList = [
    {
      id: 1,
      title: "Development",
      location: "Kadi",
    },
    {
      id: 2,
      title: "Development",
      location: "Kadi",
    },
    {
      id: 3,
      title: "DevOps",
      location: "Kadi",
    },
    {
      id: 4,
      title: "Design",
      location: "Ahmedabad",
    },
    {
      id: 5,
      title: "Marketing",
      location: "Ahmedabad",
    },
    {
      id: 6,
      title: "Data",
      location: "Gandhinagar",
    },
    {
      id: 7,
      title: "Product",
      location: "Gandhinagar",
    },
  ];

  const [searchParams, setSearchParams] = useSearchParams();
  const [title, setTitle] = useState(searchParams.get("q") || "");
  const [location, setLocation] = useState(searchParams.get("loc") || "");
  const [filteredList, SetFilteredList] = useState(jobList);

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);

    if (title && title.trim() !== "") {
      params.set("q", title);
    } else {
      params.delete("q");
    }

    if (location && location.trim() !== "") {
      params.set("loc", location);
    } else {
      params.delete("loc");
    }

    setSearchParams(params);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    SetFilteredList(
      jobList.filter(
        (job) =>
          job.title
            .toLowerCase()
            .includes((params.get("q") || "").toLowerCase()) &&
          job.location
            .toLowerCase()
            .includes((params.get("loc") || "").toLowerCase())
      )
    );
  }, [searchParams]);

  useEffect(() => {
    setTitle(searchParams.get("q") || "");
    setLocation(searchParams.get("loc") || "");
  }, [searchParams]);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleLocation = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div className="bg-[#EAE0D5] text-[#5E503F] max-w-6xl px-4 py-8 mx-auto">
      <h1 className="text-2xl font-bold mb-4">Job Listings</h1>

      <div
        id="jobs-search-placeholder"
        className=" sticky top-0 z-50 bg-[#EAE0D5] py-2 shadow-sm rounded mb-6"
      >
        <form
          className="flex flex-wrap sm:flex-nowrap gap-2 px-2 items-stretch"
          onSubmit={handleSubmit}
        >
          <input
            id="job-title"
            type="text"
            aria-label="Job Title"
            name="q"
            className="border rounded-md text-sm sm:text-lg p-2 h-10 sm:h-12 flex-1 min-w-0 w-full"
            placeholder="Job Title"
            value={title}
            onChange={handleTitle}
          />
          <input
            id="job-location"
            type="text"
            aria-label="Job Location"
            name="loc"
            className="border rounded-md text-sm sm:text-lg p-2 h-10 sm:h-12 w-full sm:w-40"
            placeholder="Job Location"
            value={location}
            onChange={handleLocation}
          />
          <button
            aria-label="Search"
            className="w-full h-10 sm:h-12 sm:w-12  shrink-0 bg-[#22333B] hover:bg-[#233c4d] hover:shadow-lg text-white rounded-md flex items-center justify-center px-3 cursor-pointer border-0 sm:ml-0"
            type="submit"
          >
            <FaSearch />
          </button>
        </form>
      </div>

      <div id="jobs-list" className="grid grid-cols-1 gap-4">
        {filteredList.length !== 0 ? (
          filteredList.map((job) => (
            <div key={job.id} className="border rounded p-4 text-gray-600">
              <p>
                <b>Title</b> : {job.title}
              </p>
              <p>
                <b>Location</b> : {job.location}
              </p>
            </div>
          ))
        ) : (
          <h1 className="font-bold text-2xl text-center rounded p-4 text-gray-600">
            No jobs found
          </h1>
        )}
      </div>
    </div>
  );
};

export default Jobs;
