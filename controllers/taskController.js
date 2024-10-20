const taskModel = require("../models/tasks");

async function getAllTasks(req, res) {
  const tasks = await taskModel.getAllTasks();

  if (tasks) 
    res.status(200).json(tasks);
  else 
    res.status(404).json({ code:404, message: "No se encontraron tareas" });
}

async function createTask(req, res) {
  const newTask = 
     await taskModel.createTask(req.body);
  res.status(201).json(newTask);
}

function getTaskById(req, res) {
  
}

function updateTask(req, res) {
  
}

function deleteTask(req, res) {
  
}

module.exports = {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
};
