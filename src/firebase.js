import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAJUtZV3qrrlRIpK4k5oVRa_UGvcAQO260",
  authDomain: "healthguru-59602.firebaseapp.com",
  projectId: "healthguru-59602",
  storageBucket: "healthguru-59602.appspot.com",
  messagingSenderId: "31605522139",
  appId: "1:31605522139:web:5d5b51cb5f014de0aa16fe"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export {db};
export default firebaseApp;