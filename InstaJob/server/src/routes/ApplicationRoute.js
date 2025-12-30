const express = require("express");
const router = express.Router();
const protected = require("../Middleware/authMiddleware");
const authorize = require("../Middleware/roleMiddleware");

const {
  applyJob,
  getRecruiterApplicationJob,
  patchStatus,
  getApplicantJobs,
} = require("../controllers/ApplicationController");

router.get(
  "/recruiter/get/:jobId",
  protected,
  authorize("recruiter"),
  getRecruiterApplicationJob
);
router.get(
  "/applicant/get",
  protected,
  authorize("applicant"),
  getApplicantJobs
);
router.post("/:id", protected, authorize("applicant"), applyJob);
router.patch(
  "/patch/:applicationId/:status",
  protected,
  authorize("recruiter"),
  patchStatus
);

module.exports = router;
