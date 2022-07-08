import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import Login from "../components/login";
import { Loading } from "../components/Loading";
import { useEffect } from "react";
import {
  collection,
  doc,
  serverTimestamp,
  setDoc,
  Timestamp,
} from "firebase/firestore";

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      const document = doc(db, `users/${user.uid}`);
      setDoc(
        document,
        {
          email: user.email,
          lastSeen: Timestamp.now(),
          photoURL: user.photoURL,
        },
        { merge: true }
      );
    }
  }, [user]);

  // const addAuthUser = async () => {
  //   if (user) {
  //     try {
  //       const docRef = await setDoc(
  //         collection(db, "users"),
  //         {
  //           email: user.email,
  //           lastseen: serverTimestamp(),
  //           photoURL: user.photoURL,
  //         },
  //         { merge: true }
  //       );
  //       console.log("Document written with ID: ", docRef.id);
  //     } catch (e) {
  //       console.error("Error adding document: ", e);
  //     }
  //   }
  // };
  // useEffect(() => {
  //   addAuthUser();
  // }, [user]);

  if (loading) return <Loading />;

  if (!user) return <Login />;
  return <Component {...pageProps} />;
}

export default MyApp;
