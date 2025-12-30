const express = require("express");
const router = express.Router();
const protected = require("../Middleware/authMiddleware");
const authorize = require("../Middleware/roleMiddleware");

const {
  applyJob,
  getApplicationJob,
  patchStatus,
} = require("../controllers/ApplicationController");

router.get("/get/:jobId", protected, authorize("recruiter"), getApplicationJob);
router.post("/:id", protected, authorize("applicant"), applyJob);
router.patch(
  "/patch/:applicationId/:status",
  protected,
  authorize("recruiter"),
  patchStatus
);

module.exports = router;
