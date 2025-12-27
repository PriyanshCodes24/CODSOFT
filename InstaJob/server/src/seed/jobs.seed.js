const mongoose = require("mongoose");
require("dotenv").config();

const Job = require("../models/Job");

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    // await Job.deleteMany({});
    // console.log("Old jobs deleted");

    const recruiter1 = "694b826dc368c40a20261906"; // Priyansh
    const recruiter2 = "6946b5a4686f1be72a37fedc"; // Pinko

    const jobs = [
      {
        title: "Full-stack Developer",
        location: "Remote",
        company: "InstaJob",
        type: "Full-time",
        description:
          "React + Tailwind, Node + MongoDb + Express developer needed",
        postedBy: recruiter1,
      },
      {
        title: "DevOps Engineer",
        location: "Ahmedabad",
        company: "InstaJob",
        type: "Full-time",
        description: "AWS + Docker + CI/CD",
        postedBy: recruiter1,
      },
      {
        title: "Frontend Developer",
        location: "Remote",
        company: "Pinko Labs",
        type: "Remote",
        description: "React + Tailwind developer needed",
        postedBy: recruiter2,
      },
      {
        title: "Backend Developer",
        location: "Gandhinagar",
        company: "Pinko Labs",
        type: "Full-time",
        description: "Node.js + MongoDB backend role",
        postedBy: recruiter2,
      },
    ];

    await Job.insertMany(jobs);
    console.log("Jobs seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

run();
