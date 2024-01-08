import { useState, useEffect, createContext } from "react";
import axiosInstance from "../utils/axiosInstance";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checkUser, setCheckUser] = useState(false);
  const [userUpdated , setUserserUpdated] = useState(false)

  useEffect(() => {
    if (!user && user === null) {
      fetchUserData();
    }
  }, [user, userUpdated]);

  const fetchUserData = async () => {
    try {
      setCheckUser(true);
      const response = await axiosInstance.get("auth/logged-in-user");
      setUser(response.data.user);
    } catch (err) {
      console.log(err);
    } finally {
      setCheckUser(false);
    }
  };

  const logOut = async () => {
    await axiosInstance.post("auth/logout");
    setUser(null);
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        checkUser,
        setUser,
        logOut,
        fetchUserData,
        setUserserUpdated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
