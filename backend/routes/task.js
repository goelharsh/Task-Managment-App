const express = require('express');
const router = express.Router();
const taskController =  require("../controllers/task");
const authMiddleware = require("../middlewares/auth");
// Fetch all tasks
router.get('/fetchAllTasks', authMiddleware.auth, taskController.fetchAllTasks);

// Fetch a single task by ID
router.get('/fetchTaskById/:id', authMiddleware.auth, taskController.fetchTaskById);

// Create a new task
router.post('/createNewTask', authMiddleware.auth, taskController.createNewTask);

// Update a task by ID
router.put('/updateTask/:id', authMiddleware.auth, taskController.updateTask);

// Delete a task by ID
router.delete('/tasks/:id', authMiddleware.auth, taskController.deleteTask);

module.exports = router;