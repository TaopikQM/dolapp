"use client";

import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

const useProtectedRoute = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.href = "/auth/login";
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return loading;
};

export default useProtectedRoute;
