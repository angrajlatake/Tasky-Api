import mongoose from "mongoose";
const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    startingDate: {
      type: Date,
      default: Date.now,
    },
    targetDate: {
      type: Date,
    },
    manager: {
      type: String,
    },
    status: {
      type: String,
      default: "pending",
    },
    assignedTo: {
      type: String,
    },
    desc: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
