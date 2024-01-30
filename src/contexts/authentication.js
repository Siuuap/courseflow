"use client";
import React, { useState } from "react";
import axios from "axios";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [state, setState] = useState({
    loading: null,
    error: null,
    user: null,
  });

  // make a login request
  const login = async (data) => {};

  // register the user
  const register = async (data) => {
   await axios.post("http://localhost:3000/api/register", data);
  };

  const logout = () => {};

  //const isAuthenticated = Boolean(localStorage.getItem("token"));

  return (
    <AuthContext.Provider
      value={{ state, login, logout, register /*isAuthenticated */ }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

// this is a hook that consume AuthContext
const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
