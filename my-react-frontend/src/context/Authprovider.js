import React, { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigation } from "react-router-dom";

export const AuthContext = createContext();

export default function Authprovider({ children }) {
  const [user, setUser] = useState({});
  const navigate = useNavigation();
  const auth = getAuth();
  useEffect(() => {
    const unsubcribed = auth.onIdTokenChanged((user) => {
      console.log({ user });
      if (user?.uid) {
        setUser(user);
        localStorage.setItem("accessToken", user.accessToken);
        return;
      }

      //reset user info
      setUser({});
      localStorage.clear();
      navigate("/login");
    });
    return () => {
      unsubcribed();
    };
  }, [auth]);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
