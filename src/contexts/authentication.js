"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [state, setState] = useState({
    loading: null,
    error: null,
    user: null,
  });
  const router = useRouter();

  async function login(e) {
    try {
      setState({ ...state, error: false, loading: true });
      const result = await axios.post(
        "http://localhost:3000/api/auth/login",
        data
      );

      const status = result.data.status;

      if (status == 200) {
        setState({
          error: false,
          loading: false,
        });

        router.push("/homepage");
      } else {
        setState({
          error: true,
          loading: false,
        });
      }
    } catch (error) {
      setState({
        error: true,
        loading: false,
      });
    }
  }

  // register the user
  async function register(data) {
    await axios.post("http://localhost:3000/api/auth/register", data); // 5 sec
    router.push("/login");
    router.refresh();
  }

  async function logout() {
    await axios.post("http://localhost:3000/api/auth/logout");
    setState({ ...state, user: null, error: false });
    router.refresh();
  }

  async function adminRegister(data) { // email , password
    try {
      const responseFromServer = await axios.post(
        "http://localhost:3000/api/auth/admin/register", data //email , password
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
    <AuthContext.Provider
      value={{
        adminRegister,
        adminLogin,
        state,
        setState,
        login,
        logout,
        register,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return React.useContext(AuthContext);
}

export { AuthProvider, useAuth };
