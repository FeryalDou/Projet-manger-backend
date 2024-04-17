const express = require("express");
const router = express.Router();
const Project = require("../models/Project.model");

//create new project
router.post("/", async (req, res, next) => {
  //console.log(coucou);
  try {
    const { name, description, startDate, endDate } = req.body;
    const project = await Project.create({
      name,
      description,
      startDate,
      endDate,
    });
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
});

//Get all projects
router.get("/", async (req, res, next) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
});

//get project by id
router.get("/:id", async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
});

//update by id
router.put("/:id", async (req, res, next) => {
  try {
    const { name, description, startDate, endDate } = req.body;
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { name, description, startDate, endDate },
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
});

//delete by id

router.delete("/:id", async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;