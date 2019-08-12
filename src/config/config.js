import firebase from "firebase/app";
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyD_ccqzRo5NEFwHQ6vF2XEz6t3UI1p-KvE",
    authDomain: "grading-app-e3907.firebaseapp.com",
    databaseURL: "https://grading-app-e3907.firebaseio.com",
    projectId: "grading-app-e3907",
    storageBucket: "",
    messagingSenderId: "293255755456",
    appId: "1:293255755456:web:a53f09a30f6d27e9"
  };
 
const fire = firebase.initializeApp(firebaseConfig);

export default fire;