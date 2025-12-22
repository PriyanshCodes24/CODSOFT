const Application = require("../models/Application");

const applyJob = async (req, res) => {
  try {
    const job = req.params.id;
    const user = req.user.id;

    if (!job) {
      return res
        .status(400)
        .json({ success: false, message: "Missing Job Id" });
    }
    const alreadyApplied = await Application.findOne({ job, applicant: user });

    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "You have already applied to this job",
      });
    }

    const application = await Application.create({ job, applicant: user });

    res
      .status(201)
      .json({ success: true, message: "Applied successfully", application });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to apply" });
  }
};

module.exports = { applyJob };
