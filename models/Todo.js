const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true, // 🔥 THIS IS WHY 500 WAS COMING
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    deadline: {
      type: Date,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
