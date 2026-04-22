import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("studyflow_user");
    const savedToken = localStorage.getItem("studyflow_token");

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedToken) setToken(savedToken);
  }, []);

  const login = (userData) => {
    const fakeToken = "studyflow-demo-token";

    setUser(userData);
    setToken(fakeToken);

    localStorage.setItem("studyflow_user", JSON.stringify(userData));
    localStorage.setItem("studyflow_token", fakeToken);
  };

  const logout = () => {
    setUser(null);
    setToken("");

    localStorage.removeItem("studyflow_user");
    localStorage.removeItem("studyflow_token");
  };

  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}