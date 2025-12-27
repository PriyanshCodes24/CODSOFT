const express = require("express");
const router = express.Router();
const protected = require("../Middleware/authMiddleware");
const authorize = require("../Middleware/roleMiddleware");

const {
  applyJob,
  getApplicationJob,
} = require("../controllers/ApplicationController");

router.get("/get/:jobId", protected, authorize("recruiter"), getApplicationJob);
router.post("/:id", protected, authorize("applicant"), applyJob);

module.exports = router;
