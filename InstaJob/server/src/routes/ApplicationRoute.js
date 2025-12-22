const express = require("express");
const router = express.Router();
const protected = require("../Middleware/authMiddleware");
const authorize = require("../Middleware/roleMiddleware");

const { applyJob } = require("../controllers/ApplicationController");

router.post("/:id", protected, authorize("applicant"), applyJob);

module.exports = router;
