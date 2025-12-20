const express = require("express");
const router = express.Router();
const protected = require("../Middleware/authMiddleware");
const authorize = require("../Middleware/roleMiddleware");

const {
  getJobs,
  getJobDetails,
  postJob,
} = require("../controllers/jobController");

router.get("/", getJobs);
router.get("/:id", getJobDetails);
router.post("/", protected,authorize('recruiter','admin'), postJob);

module.exports = router;
