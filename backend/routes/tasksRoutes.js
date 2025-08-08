const express = require("express");
const { getTasks, createTask, deleteTask, updateTask } = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getTasks);
router.post("/", authMiddleware, createTask);
router.delete("/:id", authMiddleware, deleteTask);
router.patch("/:id", authMiddleware, updateTask);

module.exports = router;
