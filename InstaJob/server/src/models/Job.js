const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trimmed: true,
      required: true,
      index: true,
    },
    location: {
      type: String,
      trimmed: true,
      required: true,
      index: true,
    },
    company: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      enum: ["Full-time", "Internship", "Remote"],
      default: ["Fulltime"],
    },
    description: {
      type: String,
      trimmed: true,
    },
  },
  {
    timestamps: true,
  }
);

jobSchema.index({ title: "text" });
jobSchema.index({ location: 1 });

const job = mongoose.model("Job", jobSchema);

module.exports = job;
