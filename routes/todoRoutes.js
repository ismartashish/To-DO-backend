const express = require("express");
const Todo = require("../models/Todo");
const router = express.Router();

/* GET TODOS */
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    console.error("GET ERROR:", err);
    res.status(500).json({ message: "Failed to fetch todos" });
  }
});

/* CREATE TODO */
router.post("/", async (req, res) => {
  try {
    const { task, deadline, priority } = req.body;

    if (!task) {
      return res.status(400).json({ message: "Task is required" });
    }

    const todo = await Todo.create({
      task,
      deadline,
      priority,
    });

    res.status(201).json(todo);
  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(500).json({ message: "Failed to create todo" });
  }
});

/* UPDATE TODO */
router.put("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(todo);
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ message: "Update failed" });
  }
});

/* DELETE TODO */
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;
