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
    const response = await axios.post(
      "http://localhost:3000/api/auth/admin/registers",
      data
    );
  }

  return (
    <AuthContext.Provider value={{ adminRegister }}>
      {props.children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return React.useContext(AuthContext);
}

export { AuthProvider, useAuth };
