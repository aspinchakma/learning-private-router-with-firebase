import { useState } from "react";
import { AuthContext } from "./Context";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
