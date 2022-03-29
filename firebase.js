  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
  import { 
    getFirestore, //Trae la conexion a firestore
    collection, //Crear una tabla o coleccion de datos
    addDoc, //Añadir un documento
    getDocs, //Obtener datos del servidor
    onSnapshot, //Cuando los datos cambien
    deleteDoc, //Eliminar un documento
    doc, //Un solo documento
    getDoc, //Obtener tarea
    updateDoc //Actualizar un documento
  } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyB521DWExWoFyHxbKY-Om2GWpNjCdqhN20",
    authDomain: "fir-javasscript-crud.firebaseapp.com",
    projectId: "fir-javasscript-crud",
    storageBucket: "fir-javasscript-crud.appspot.com",
    messagingSenderId: "334799587182",
    appId: "1:334799587182:web:4c97f03905d86cbdbfa37f"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(); //Conexion a la base de datos

//Aqui se guarda un documento en la coleccion llamada tasks atraves de la base de datos (db), en este caso el titulo y la descripcion
export const saveTask = (title, description) => 
    addDoc(collection(db, "tasks"), {title, description});

//Asi mando a llamar datos desde el servidor
export const getTasks = () => getDocs(collection(db,"tasks"));

//Se queda escuchando para que los cambios se realicen en tiempo real y no recargar la pagina
export const onGetTasks = (callback) => onSnapshot(collection(db, "tasks"), callback);

//Eliminar un solo documento, no una coleccion
export const deleteTask = id => deleteDoc(doc(db, "tasks", id));

//Editar un documento
export const getTask = id => getDoc(doc(db, "tasks", id));

//
export const updateTask = (id, newFields) => updateDoc(doc(db, "tasks", id), newFields);