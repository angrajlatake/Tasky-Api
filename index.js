import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";

import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import projectsRoute from "./routes/project.js";
import taskRoute from "./routes/task.js";
import { verifyToken } from "./utils/verifyToken.js";
import { updateUser, updateUserImg } from "./controller/users.js";

const PORT = process.env.PORT || 8080;
const __dirname = path.resolve();

const app = express();

dotenv.config();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/users");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpg");
  },
});

export const upload = multer({ storage: storage });

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("connected to DB");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("error", () => {
  console.log("Error connecting to MongoDB");
});

//middleware
const corsOptions = {
  //To allow requests from client
  origin: "https://angrajlatake-tasky.netlify.app/",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/projects", projectsRoute);
app.use("/task", taskRoute);

app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || "Something went wrong";
  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    stack: err.stack,
  });
});

app.listen(PORT, () => {
  connect();
  console.log(__dirname);
  console.log("Server started on port 8080");
});

app.post("/profile/:id", upload.single("image"), verifyToken, updateUserImg);

app.get("/", (req, res) => {
  res.redirect("https://documenter.getpostman.com/view/19563435/2s83zcT7C3");
});
