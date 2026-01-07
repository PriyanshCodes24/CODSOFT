const Application = require("../models/Application");
const Job = require("../models/Job");

const applyJob = async (req, res) => {
  try {
    const job = req.params.id;
    const user = req.user.id;

    if (!job) {
      return res
        .status(400)
        .json({ success: false, message: "Missing Job Id" });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume is required",
      });
    }

    const alreadyApplied = await Application.findOne({ job, applicant: user });

    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "You have already applied to this job",
      });
    }

    const application = await Application.create({
      job,
      applicant: user,
      resume: req.file.path,
    });

    res
      .status(201)
      .json({ success: true, message: "Applied successfully", application });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to apply" });
  }
};

const getRecruiterApplicationJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findOne({ _id: jobId, postedBy: req.user.id });

    if (!job) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    const applications = await Application.find({ job: jobId }).populate(
      "applicant",
      "name email"
    );

    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      success: false,
      message: "Unauthorized access",
    });
  }
};

const patchStatus = async (req, res) => {
  try {
    const { applicationId, status } = req.params;
    const application = await Application.findById(applicationId).populate(
      "job"
    );

    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "No application found" });
    }
    if (application.job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to modify this application",
      });
    }

    if (!["accepted", "rejected"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: `${status} is not a valid status` });
    }
    if (application.status === status) {
      return res
        .status(400)
        .json({ success: false, message: `Application is already ${status}` });
    }

    application.status = status;
    await application.save();

    res.status(200).json({
      success: true,
      message: `Aplication ${application.status}`,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to change the status" });
  }
};

const getApplicantJobs = async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user.id,
    }).populate("job");

    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Could not fetch jobs",
    });
  }
};

module.exports = {
  applyJob,
  getRecruiterApplicationJob,
  patchStatus,
  getApplicantJobs,
};
