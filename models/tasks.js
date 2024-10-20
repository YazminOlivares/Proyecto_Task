const { v4: uuidv4 } = require("uuid");
const { collection, addDoc, getDocs, doc } = require( "firebase/firestore");
const db = require( "../firebaseCo.js" );

async function getAllTasks() {
  const projects = await getDocs(collection(db, 'tasks'));

  return projects.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
  createTask
}