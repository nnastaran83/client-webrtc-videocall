import { useState, useEffect } from "react";
import { auth } from "../firebase_module";
import { onAuthStateChanged } from "firebase/auth";

const useAuthState = () => {
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userData = {
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          // Add more fields if needed
        };
        setUser(userData);
        sessionStorage.setItem("user", JSON.stringify(userData));
      } else {
        setUser(null);
        sessionStorage.removeItem("user");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return [user, setUser];
};

export default useAuthState;
