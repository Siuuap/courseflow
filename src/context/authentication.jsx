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

  async function adminRegister(data) {
    try {
      const responseFromServer = await axios.post(
        "http://localhost:3000/api/auth/admin/register",
        data
      );
      return responseFromServer;
    } catch (error) {
      console.log(`error from request`, error);
    }
  }
  async function adminLogin(data) {
    try {
      const responseFromServer = await axios.post(
        "http://localhost:3000/api/auth/admin/login",
        data
      );

      return responseFromServer;
    } catch (error) {
      console.log(`error from request`, error);
    }
  }
  return (
    <AuthContext.Provider value={{ adminRegister, adminLogin }}>
      {props.children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return React.useContext(AuthContext);
}

export { AuthProvider, useAuth };
