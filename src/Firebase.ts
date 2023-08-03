import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpLU7pqvlU9EYtto27xF1ENyMXjER41Ys",
  authDomain: "project3-6b5a2.firebaseapp.com",
  projectId: "project3-6b5a2",
  storageBucket: "project3-6b5a2.appspot.com",
  messagingSenderId: "836623293519",
  appId: "1:836623293519:web:8598452decb845dfde9e3a",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();
export default firebase;
