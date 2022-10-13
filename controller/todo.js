import Todo from "../models/todo.js";
import { createError } from "../utils/error.js";

//create todo
export const createTodo = async (req, res, next) => {
  const userId = req.params.id;
  const newTodo = new Todo({
    todo: req.body.todo,
    user: userId,
  });

  try {
    const savedTodo = await newTodo.save();
    try {
      const foundTodos = await Todo.find({ user: userId });
      if (!foundTodos) {
        return next(createError(404, "Tasks for user not found"));
      }
      res.status(200).json(foundTodos);
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

//edit todo
export const updateTodo = async (req, res, next) => {
  try {
    const foundTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    try {
      const foundTodos = await Todo.find({ user: userId });
      if (!foundTodos) {
        return next(createError(404, "Tasks for user not found"));
      }
      res.status(200).json(foundTodos);
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

//delete todo

export const deleteTodo = async (req, res, next) => {
  try {
    const foundTodo = await Todo.findByIdAndDelete(req.params.id);
    try {
      const foundTodos = await Todo.find({ user: userId });
      if (!foundTodos) {
        return next(createError(404, "Tasks for user not found"));
      }
      res.status(200).json(foundTodos);
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

//get todo

export const getTodo = async (req, res, next) => {
  try {
    const foundTodos = await Todo.find({ user: req.params.id });
    if (!foundTodos) {
      return next(createError(404, "No Todos for user found!"));
    }
    res.status(200).json(foundTodos);
  } catch (err) {
    next(err);
  }
};
