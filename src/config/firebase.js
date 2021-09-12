import * as firebase from "firebase/app";
import * as baseAuth from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBHL3SaQZpZEw53xj6fMyEs4NID-QYJ-gA",
  authDomain: "fir-react-auth-20b87.firebaseapp.com",
  databaseURL: "https://fir-react-auth-20b87-default-rtdb.firebaseio.com",
  projectId: "fir-react-auth-20b87",
  storageBucket: "fir-react-auth-20b87.appspot.com",
  messagingSenderId: "905408126736",
  appId: "1:905408126736:web:73420a32563b4a34f48f95"
};

// console.log(firebase.auth)

const app = firebase.initializeApp(firebaseConfig);

export const auth = baseAuth.getAuth();
export default app;
