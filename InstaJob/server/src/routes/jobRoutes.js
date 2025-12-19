const express = require("express");
const router = express.Router();
const {
  getJobs,
  getJobDetails,
  postJob,
} = require("../controllers/jobController");

router.get("/", getJobs);
router.get("/:id", getJobDetails);
router.post("/", postJob);

module.exports = router;
