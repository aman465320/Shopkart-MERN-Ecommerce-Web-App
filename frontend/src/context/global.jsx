import axios from "axios";
import { useState, useContext, createContext, useEffect } from "react";
const AuthContext = createContext();
// auth provider

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  // fulfilling token when auth is received
  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    // collecting data from local storage and re rendering the whole app jab bhi auth me changes ayenge so that data lost na ho refresh karne pe
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }
    // eslint-disable-next-line
  }, []);

  return (
    // returning the provide from context api so that it can be used anywhere in the app
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
const useAuth = () => useContext(AuthContext);
export { useAuth, AuthProvider };
