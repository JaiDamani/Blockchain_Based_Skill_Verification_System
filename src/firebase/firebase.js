import firebase from "firebase/app";
import "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyA3pOj1Ex5Y95upo3WYO-LtlO9O3-H-usc",
//   authDomain: "skillset-verified.firebaseapp.com",
//   projectId: "skillset-verified",
//   storageBucket: "skillset-verified.appspot.com",
//   messagingSenderId: "75144383574",
//   appId: "1:75144383574:web:75af1487584a97169b7ff7",
//   measurementId: "G-REQXD214NH",
// };
const firebaseConfig = {
  apiKey: "AIzaSyAn2LdAk5COYGa55nF6xV75sU-Q6YhQT00",
  authDomain: "skillset-verified-ff474.firebaseapp.com",
  projectId: "skillset-verified-ff474",
  storageBucket: "skillset-verified-ff474.appspot.com",
  messagingSenderId: "38910875483",
  appId: "1:38910875483:web:26c02d9f89fe3b8a166c7e",
  measurementId: "G-HM86DZKYF0"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.firestore();
}

export const db = firebase.firestore();

export default firebase;
