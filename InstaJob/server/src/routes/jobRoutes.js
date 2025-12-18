const express = require("express");
const router = express.Router();
const { getJobs, getJobDetails } = require("../controllers/jobController");

router.get("/", getJobs);
router.get("/:id", getJobDetails);

module.exports = router;
