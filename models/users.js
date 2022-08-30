import mongoose from "mongoose";
const { Schema } = mongoose;

const toLower = (string) => {
  return string.toLowerCase();
};
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      required: true,
    },
    email: {
      type: String,
      set: toLower,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Users", userSchema);
