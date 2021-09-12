import {
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithEmailAndPassword
} from "firebase/auth";
import React from "react";
import { auth } from "../config/firebase";

const authContext = React.createContext();

export function useAuth() {
  return React.useContext(authContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const signup = async (name, email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: name
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const signout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("sign out failed", error);
    }
  };

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  React.useEffect(() => {
    console.log("context auth", currentUser);
    console.log("auth.currentuser", auth.currentUser);
  }, [currentUser]);

  React.useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unSub;
  }, []);

  const values = {
    currentUser,
    signup,
    signout,
    login
  };

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <authContext.Provider value={values}>
      {!loading && children}
    </authContext.Provider>
  );
}
