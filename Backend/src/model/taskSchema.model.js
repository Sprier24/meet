const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  subject: { type: String },
  name: { type: String },
  relatedTo: { type: String },
  taskDate: {
    type: String,
    required: false,
  },
  dueDate: { 
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ["Pending", "Resolved", "In Progress"],
    default: "Pending",
  },
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    default: "Medium",
  },
  assigned: { type: String },
  notes: {
    type: String,
    default: "",
  },
  isActive: {
    type: Boolean,
    default: true,
  }
}, { timestamps: true });

const Task = mongoose.model("tasks", taskSchema);

module.exports = Task;
