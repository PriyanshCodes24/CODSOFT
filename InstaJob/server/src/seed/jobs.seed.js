const mongoose = require("mongoose");
const Job = require("../models/Job");
require("dotenv").config();

const jobs = [
  {
    title: "Frontend Developer",
    location: "Ahmedabad",
    company: "TechSpark",
    type: "Full-time",
    description: "Work with React and modern frontend tools.",
  },
  {
    title: "Backend Developer",
    location: "Remote",
    company: "CloudNova",
    type: "Full-time",
    description: "Node.js, Express, MongoDB backend role.",
  },
  {
    title: "React Intern",
    location: "Gandhinagar",
    company: "InnoLabs",
    type: "Internship",
    description: "Internship focused on React and UI development.",
  },
  {
    title: "DevOps Engineer",
    location: "Kadi",
    company: "DeployHub",
    type: "Full-time",
    description: "CI/CD pipelines, Docker, AWS.",
  },
  {
    title: "UI/UX Designer",
    location: "Ahmedabad",
    company: "Designify",
    type: "Remote",
    description: "Design modern and user-friendly interfaces.",
  },
  {
    title: "Data Analyst",
    location: "Gandhinagar",
    company: "DataWorks",
    type: "Full-time",
    description: "Analyze data and generate insights.",
  },
  {
    title: "Marketing Executive",
    location: "Ahmedabad",
    company: "GrowthX",
    type: "Full-time",
    description: "Digital marketing and campaign management.",
  },
  {
    title: "Product Manager",
    location: "Remote",
    company: "BuildRight",
    type: "Full-time",
    description: "Own product roadmap and feature delivery.",
  },
];

const seedJobs = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("running");

    await Job.insertMany(jobs);
    console.log("Jobs seeded successfully");

    process.exit();
  } catch (e) {
    console.error("Seeding error: ", e);
    process.exit(1);
  }
};

seedJobs();
