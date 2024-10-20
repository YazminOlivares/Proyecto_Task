const { v4: uuidv4 } = require("uuid");
const { collection, addDoc, getDocs, doc, getDoc,updateDoc, deleteDoc} = require( "firebase/firestore");
const db = require( "../firebaseCo.js" );

async function getAllTasks() {
  const projects = await getDocs(collection(db, 'tasks'));

  return projects.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}


async function getTaskById(id) {
  const taskRef = doc(db, 'tasks', id); 
  const taskSnap = await getDoc(taskRef); 

  if (taskSnap.exists()) {
    return { id: taskSnap.id, ...taskSnap.data() }; 
  } else {
    throw new Error("No such document!"); 
  }
}

async function updateTask(id, newData) {
  const taskRef = doc(db, 'tasks', id); 
  await updateDoc(taskRef, newData);
  return { id, ...newData }; 
}

async function deleteTaskById(id) {
  const taskRef = doc(db, 'tasks', id); 
  await deleteDoc(taskRef); 
}

async function createTask(data) {
    const newTask = {
        id: uuidv4(),
        title: data.title,
        description: data.description,
        completed: data.completed,
        createdAt: new Date(),
    };
    
    const docRef = await addDoc(collection(db, 'tasks'), newTask);
    return { id: docRef.id, ...newTask };
}

module.exports = {
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTaskById,
  createTask
}