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

async function getTaskById(req, res) {
  const { id } = req.params; 
  try {
    const task = await taskModel.getTaskById(id); 
    res.status(200).json(task); 
  } catch (error) {
    res.status(404).json({ code: 404, message: error.message });
  }
}

async function updateTask(req, res) {
  const { id } = req.params; 
  const newData = req.body; 
  try {
    const updatedTask = await taskModel.updateTask(id, newData);
    res.status(200).json({ code: 200, message: "Tarea actualizada correctamente", task: updatedTask });
  } catch (error) {
    console.error("Error al actualizar la tarea:", error);
    res.status(404).json({ code: 404, message: "Error al actualizar la tarea: " + error.message });
  }
}
async function deleteTask(req, res) {
  const { id } = req.params; 
  try {
    await taskModel.deleteTaskById(id); 
    res.status(200).json({ code: 200, message: "Tarea eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar la tarea:", error);
    res.status(404).json({ code: 404, message: "Error al eliminar la tarea: " + error.message });
  }
}

module.exports = {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
};
