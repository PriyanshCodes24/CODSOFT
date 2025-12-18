const Job = require("../models/Job");

const getJobs = async (req, res) => {
  try {
    const { q, loc } = req.query;
    const filters = {};

    if (q && q.trim() !== "") {
      filters.$text = { $search: q };
    }

    if (loc && loc.trim() !== "") {
      filters.location = { $regex: loc, $options: "i" };
    }

    const jobs = await Job.find(filters).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "failed to fetch jobs",
    });
  }
};

const getJobDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const jobDetails = await Job.findById(id);
    if (!jobDetails) {
      return res
        .status(404)
        .json({ success: false, message: "Job details not found" });
    }
    res.status(200).json({ success: true, jobDetails });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "failed to fetch job details",
    });
  }
};

module.exports = { getJobs, getJobDetails };
