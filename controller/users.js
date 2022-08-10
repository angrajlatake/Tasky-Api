import Users from "../models/users.js";

export const updateUser = async (req, res, next) => {
  try {
    const foundUser = await Users.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ message: " User updated!" });
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
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await Users.find({}).select("username email");

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
