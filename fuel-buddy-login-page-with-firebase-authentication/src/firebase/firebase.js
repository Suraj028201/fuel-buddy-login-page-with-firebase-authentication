// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBvKBL7_RuzT1GP9Xyjy2mbokhPBcfb_sY",
  authDomain: "vue-project-ce4d9.firebaseapp.com",
  projectId: "vue-project-ce4d9",
  storageBucket: "vue-project-ce4d9.appspot.com",
  messagingSenderId: "208410518436",
  appId: "1:208410518436:web:c777b0c835b7c2142b1731"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };