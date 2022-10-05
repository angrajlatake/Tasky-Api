import Users from "../models/users.js";
import Project from "../models/project.js";
import Task from "../models/Task.js";
import bcrypt from "bcryptjs";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export const createUsers = async (data) => {
  const newUsers = [];
  data.forEach((item) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync("testpass", salt);
    const newUser = {
      username: item.username,
      email: item.email,
      password: hash,
      name: item.name,
    };
    newUsers.push(newUser);
  });
  await Users.insertMany(newUsers);
  console.log("users added");
};

export const createTasks = async (data) => {
  const newTasks = [];
  const today = new Date();
  const target = new Date();
  const status = ["pending", "progress", "review", "completed"];

  const userIDS = [
    "633cef1ab11498e0599ae990",
    "633cef1ab11498e0599ae991",
    "633cef1ab11498e0599ae992",
    "633cef1ab11498e0599ae993",
    "633cef1ab11498e0599ae996",
    "633cef1ab11498e0599ae997",
    "633cef1ab11498e0599ae99b",
    "633cef1ab11498e0599ae99c",
  ];

  const project = [
    "62f942e00920f6c21def8baf",
    "62f945a804dce6cdbbeccf6d",
    "6315176eabbf24c242032c83",
  ];

  data.forEach(async (item) => {
    today.setDate(today.getDate() - getRandomInt(20));
    target.setDate(target.getDate() + getRandomInt(10));
    const task = {
      title: item.title,
      desc: item.desc,
      startingDate: today,
      targetDate: target,
      status: status[getRandomInt(4)],
      assignedTo: userIDS[getRandomInt(8)],
    };
    const newTask = new Task(task);
    try {
      const savedTask = await newTask.save();
      try {
        await Project.findByIdAndUpdate(project[getRandomInt(3)], {
          $push: { tasks: savedTask._id },
        });
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  });
};
