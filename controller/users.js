import Users from "../models/users.js";
import { createError } from "../utils/error.js";
import bcrypt from "bcryptjs";

export const updateUser = async (req, res, next) => {
  try {
    if (req.body.password) {
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(req.body.password, salt);
      req.body.password = hash;
    }
    const foundUser = await Users.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ message: " User updated!", user: foundUser });
  } catch (err) {
    next(err);
  }
};
export const updateUserImg = async (req, res, next) => {
  if (!req.file) return createError(404, "File not uploaded");
  var host = req.get("host");
  try {
    const foundUser = await Users.findByIdAndUpdate(
      req.params.id,
      {
        $set: { image: `https://${host}/${req.file.path}` },
      },
      { new: true }
    );
    res
      .status(200)
      .json({ message: " User profile updated!", user: foundUser });
  } catch (err) {
    next(err);
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    const foundUser = await Users.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: `${foundUser.username} is deleted!` });
  } catch (err) {
    next(err);
  }
};
export const getUserById = async (req, res, next) => {
  try {
    const foundUser = await Users.findById(req.params.id).select(
      "name email image"
    );
    if (!foundUser) {
      return next(createError(404, "User not found"));
    }
    res.status(200).json(foundUser);
  } catch (err) {
    next(err);
  }
};
export const getAllAdminUsers = async (req, res, next) => {
  try {
    const users = await Users.find({ isAdmin: true }).select(
      "name email image"
    );

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await Users.find({}).select("name email image");

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
