const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController')


router.get('/', taskController.getAllTasks);

router.post('/', taskController.createTask);

router.get('/:id', taskController.getTaskById);

router.put('/', taskController.updateTask);

router.delete('/:id', taskController.deleteTask);

module.exports = router;