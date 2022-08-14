import mongoose from "mongoose";
const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    startingDate: {
      type: Date,
    },
    targetDate: {
      type: Date,
    },
    manager: {
      type: String,
      required: true,
    },
    tasks: {
      type: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
