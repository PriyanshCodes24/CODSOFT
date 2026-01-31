const express = require("express");
const router = express.Router();
const protected = require("../Middleware/authMiddleware");
const authorize = require("../Middleware/roleMiddleware");

const {
  getJobs,
  getJobDetails,
  postJob,
  getMyJobs,
  hasAlreadyApplied,
  deleteJob,
} = require("../controllers/jobController");

router.get("/", getJobs);
router.get("/get/:id", getJobDetails);
router.get("/my-jobs", protected, authorize("recruiter"), getMyJobs);
router.get(
  "/hasApplied/:jobId",
  protected,
  authorize("applicant"),
  hasAlreadyApplied,
);
router.post("/", protected, authorize("recruiter", "admin"), postJob);
router.delete("/:jobId", protected, authorize("recruiter", "admin"), deleteJob);

module.exports = router;
