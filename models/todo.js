import mongoose from "mongoose";
const { Schema } = mongoose;

const todoSchema = new Schema(
  {
    todo: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Todo", todoSchema);
