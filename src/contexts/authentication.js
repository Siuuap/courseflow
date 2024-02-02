"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [state, setState] = useState({
    loading: null,
    error: false,
  });

  const router = useRouter();

  // make a login request
  const login = async (data) => {
    try {


      setState({ ...state, error: false, loading: true });
      const result = await axios.post(
        "http://localhost:3000/api/auth/login",
        data
      );

      const status = result.data.status;

      if(status == 200)
      {
        setState({
          error: false,
          loading: false,
        });

        router.push("/homepage");
      }
      else
      {
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
  };

  // register the user
  const register = async (data) => {
    await axios.post("http://localhost:3000/api/auth/register", data);
    router.push("/login");
    router.refresh();
  };

  const logout = async () => {
    await axios.post("http://localhost:3000/api/auth/logout");
    setState({ ...state, user: null, error: false });
    router.refresh();
  };

  //const isAuthenticated = Boolean(localStorage.getItem("token"));

  return (
    <AuthContext.Provider
      value={{ state, setState, login, logout, register /*isAuthenticated */ }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

// this is a hook that consume AuthContext
const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
