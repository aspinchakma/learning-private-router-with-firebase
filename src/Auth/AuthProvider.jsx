import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase.init";
import { AuthContext } from "./Context";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  onAuthStateChanged(auth, (userInfo) => {
    setUser(userInfo);
  });
  console.log(user);
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
