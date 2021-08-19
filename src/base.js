import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB4tv9IceLnkVe6B9Nknkq2iVg1hNj17u4",
  authDomain: "hot-burgers-project-48f16.firebaseapp.com",
  databaseURL: "https://hot-burgers-project-48f16-default-rtdb.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
