import { useState } from "react";
import { useEffect } from "react";

import initializeAuthentication from "../Firebase/firebase.init";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  signOut,
} from "firebase/auth";
import popupSuccess from "../popup/popupSuccess";
import popupError from "../popup/popupError";
import axios from "axios";

initializeAuthentication();

const useFirebase = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);

  const auth = getAuth();

  /* ---------------------------------- POVIDERS -------------------------------- */

  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const twitterProvider = new TwitterAuthProvider();

  /* ------------------------------- Update User Info --------------------------- */

  const updateUserInfo = (name) => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {})
      .catch((err) => {
        popupError(err.message);
      });
  };

  /* ------------------------------ Create New Account -------------------------- */

  const createNewAccount = (email, password, name) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        updateUserInfo(name);
        setUser(result.user);
        // save user to the database
        saveUser(email, name, "POST");
        window.location.pathname = "/form/signin";
        logOut(false);
        popupSuccess("new");
      })
      .catch((err) => {
        popupError(err.message);
      });

    setLoading(false);
  };

  /* ---------------------- Sign in with email and password --------------------- */
  const signInWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  /* ----------------------- Sign in with social account ------------------------ */

  const signInWithSocial = (provider) => {
    return signInWithPopup(auth, provider);
  };

  /* ------------------------------ User Logout -------------------------- */

  const logOut = (isfalse) => {
    signOut(auth)
      .then(() => {
        popupSuccess("logout", isfalse);
      })
      .catch((err) => {
        popupError(err.message);
      });
  };

  /* ------------------------------ OnAuth Change  -------------------------- */

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(
      auth,
      (user) => {
        setLoading(true);
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }

        setLoading(false);
      },
      [auth]
    );

    return () => unsubscribed;
  }, [auth]);

  /* -------------------------- Add new user to database ------------------------ */

  const saveUser = (email, displayName, method) => {
    const user = { email, displayName };
    fetch("https://stormy-plateau-29124.herokuapp.com/users", {
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then();
  };

  /* ------------------------------ Admin -------------------------- */

  useEffect(() => {
    axios
      .get(`https://stormy-plateau-29124.herokuapp.com/users/${user?.email}`)
      .then((data) => setAdmin(data.data.admin));
  }, [user?.email]);

  return {
    user,
    admin,
    saveUser,
    setUser,
    loading,
    setLoading,
    createNewAccount,
    signInWithEmail,
    signInWithSocial,
    facebookProvider,
    twitterProvider,
    googleProvider,
    logOut,
  };
};

export default useFirebase;
