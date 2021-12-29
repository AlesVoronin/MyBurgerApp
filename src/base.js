import Rebase from "re-base";
import firebase from "firebase/app";
require("firebase/database");

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDPYVuMcvW-nN76yHBQn45I2HknY-Fy8cA",
  authDomain: "myburgera.firebaseapp.com",
  databaseURL: "https://myburgera-default-rtdb.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
