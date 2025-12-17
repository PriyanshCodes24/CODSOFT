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
      data: jobs,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "failed to fetch jobs",
    });
  }
};

module.exports = { getJobs };
