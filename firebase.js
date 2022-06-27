import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDT8nVutut6YfIE49-1D1d4Er93ZEEJ4x8",
  authDomain: "whatsapp2-fffc6.firebaseapp.com",
  projectId: "whatsapp2-fffc6",
  storageBucket: "whatsapp2-fffc6.appspot.com",
  messagingSenderId: "611877496926",
  appId: "1:611877496926:web:1f3aba4583235519c16ccf",
};

let app;

if (getApps().length < 1) {
  app = initializeApp(firebaseConfig);
}
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider };
