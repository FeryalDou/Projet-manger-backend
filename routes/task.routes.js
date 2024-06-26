const express = require("express");
const router = express.Router();
const Task = require("../models/Task.model");
const isAuthenticated = require("../middlewares/isAuthenticated");

// Create a new task
router.post("/", isAuthenticated, async (req, res, next) => {
  try {
    const { name, description, project } = req.body;
    console.log(name, project);

    if (!name || !project) {
      return res
        .status(400)
        .json({ message: "Name and projectId are required" });
    }
    const task = await Task.create({
      name,
      description,
      project,
      user: req.currentUserId,
    });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
});

// Get all tasks
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.currentUserId });
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
});

// Get a task by ID
router.get("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const task = await Task.find({
      project: req.params.id,
      user: req.currentUserId,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
});

// Update by ID
router.put("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const { name, description, projectId } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { name, description, projectId },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
});

// Delete by ID
router.delete("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete({
      _id: req.params.id,
      user: currentUserId,
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
