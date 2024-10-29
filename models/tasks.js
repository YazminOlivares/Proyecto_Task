const { v4: uuidv4 } = require("uuid");
const { collection, addDoc, getDocs, doc, getDoc,updateDoc, deleteDoc, query, where} = require( "firebase/firestore");
const db = require( "../firebaseCo.js" );

async function getAllTasks(usuario) {
  console.log('Usuario getalltasks: ', usuario);
    const q = query(collection(db, 'tasks'), where('usuario', '==', usuario));
    const projects = await getDocs(q);

    return projects.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}


async function getTaskById(idTask, usuario) {
  console.log('id: ', idTask);
  console.log('usuario: ', usuario);
  const docRef = doc(db, 'tasks', idTask); // Crear referencia al documento en 'tasks'
  const taskSnapshot = await getDoc(docRef); // Obtener el documento directamente

  if (!taskSnapshot.exists()) { // Verificar si el documento existe
    const tasksCollection = collection(db, 'tasks');
    const queryById = query(tasksCollection, where('id', '==', idTask), where('usuario', '==', usuario));
    const taskSnapshot2 = await getDocs(queryById); // Buscar por el campo 'id'

    if (taskSnapshot2.empty) {
      throw new Error("No se encontró ninguna tarea con ese ID");
    }

    // Si hay resultados en la búsqueda alternativa, devolver los datos
    const taskData = taskSnapshot2.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return taskData[0]; // Devuelve el primer resultado coincidente
  }

  // Si el documento existe, extraer y devolver los datos
  const taskData = { id: taskSnapshot.id, ...taskSnapshot.data() };
  return taskData;
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

async function createTask(data, nUsuario) {
  const newTask = {
        id: uuidv4(),
        title: data.title,
        usuario: nUsuario,
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