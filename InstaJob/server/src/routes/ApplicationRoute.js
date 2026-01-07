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
const uploadResume = require("../Middleware/uploadResume");

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
router.patch(
  "/patch/:applicationId/:status",
  protected,
  authorize("recruiter"),
  patchStatus
);
router.post(
  "/:id",
  protected,
  authorize("applicant"),
  uploadResume.single("resume"),
  applyJob
);

module.exports = router;
