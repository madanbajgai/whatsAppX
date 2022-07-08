import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import Login from "../components/login";
import { Loading } from "../components/Loading";
import { useEffect } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  const addAuthUser = async () => {
    if (user) {
      try {
        const docRef = await setDoc(
          collection(db, "users"),
          {
            email: user.email,
            lastseen: serverTimestamp(),
            photoURL: user.photoURL,
          },
          { merge: true }
        );
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };
  useEffect(() => {
    addAuthUser();
  }, []);

  if (loading) return <Loading />;

  if (!user) return <Login />;
  return <Component {...pageProps} />;
}

export default MyApp;
