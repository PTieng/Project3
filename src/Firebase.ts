import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNrYUrL45UFmjqB5bMJXHx_wBlzLcDeuM",
  authDomain: "query-system-a8c9c.firebaseapp.com",
  projectId: "query-system-a8c9c",
  storageBucket: "query-system-a8c9c.appspot.com",
  messagingSenderId: "247538064924",
  appId: "1:247538064924:web:85c9fab05225dfbba3c9d9",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();
export default firebase;
