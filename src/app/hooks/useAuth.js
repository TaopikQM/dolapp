"use client";

import { useState, useEffect } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleActivity = () => {
      clearTimeout(logoutTimer);
      startLogoutTimer();
    };

    const startLogoutTimer = () => {
      logoutTimer = setTimeout(() => {
        signOut(auth)
          .then(() => {
            localStorage.removeItem('user');
            window.location.href = "/auth/login";
          })
          .catch((error) => {
            console.error("Error signing out:", error);
          });
      }, 5 * 60 * 1000); // Set to 5 minutes
    };

    let logoutTimer;
    startLogoutTimer();
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keypress", handleActivity);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        window.location.href = "/auth/login";
      }
    });

    return () => {
      clearTimeout(logoutTimer);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keypress", handleActivity);
      unsubscribe();
    };
  }, []);

  return user;
};

export default useAuth;
