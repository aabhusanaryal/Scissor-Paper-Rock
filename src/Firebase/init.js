// src/firebaseConfig.js
import firebase from "firebase";
// import firestore from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCfitjO-rf1gWy0oBZ_gvJd38nYcZ13Mao",
    authDomain: "scissor-paper-rock-vue.firebaseapp.com",
    databaseURL: "https://scissor-paper-rock-vue.firebaseio.com",
    projectId: "scissor-paper-rock-vue",
    storageBucket: "scissor-paper-rock-vue.appspot.com",
    messagingSenderId: "874473006920",
    appId: "1:874473006920:web:c3fbb122350f6a9544757d",
    measurementId: "G-3BBZ2C11FZ"
  };

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
// firebaseApp.firestore().settings({ timestampsInSnapshots: true })

export default firebaseApp.firestore()