const express = require("express");
const router = express.Router();

const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

// GET    /api/tasks       - Get all tasks
router.get("/", getAllTasks);

// GET    /api/tasks/:id   - Get a single task by ID
router.get("/:id", getTaskById);

// POST   /api/tasks       - Create a new task
router.post("/", createTask);

// PUT    /api/tasks/:id   - Update a task by ID
router.put("/:id", updateTask);

// DELETE /api/tasks/:id   - Delete a task by ID
router.delete("/:id", deleteTask);

module.exports = router;
