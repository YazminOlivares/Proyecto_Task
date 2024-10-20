// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app');
const { getFirestore  } = require('firebase/firestore');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsOWh4C3Jm2REMcoHLNiJBx9Gzmjp7gg4",
  authDomain: "proyectotasks-dfd18.firebaseapp.com",
  projectId: "proyectotasks-dfd18",
  storageBucket: "proyectotasks-dfd18.appspot.com",
  messagingSenderId: "181337177099",
  appId: "1:181337177099:web:075f2ec33773201f495b0e",
  measurementId: "G-XZ06NSQLQG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = db;