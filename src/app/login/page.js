"use client";
import { useAuth } from "@/contexts/authentication";
import { useState } from "react";
import Link from "next/link";
import NavBar from "@/components/NavBar";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, state, setState } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();

    setState({ ...state, error: false, loading: true });
  

    login({
      email,
      password,
    });
  };

  return (
    <>
      <NavBar/>
      <form
        className="flex flex-col justify-between  items-start gap-[50px] mx-[auto] p-[14px] max-w-[453px]  bg-slate-100 mt-[150px]"
        onSubmit={handleSubmit}
      >
        <h1 className="  bg-slate-200 text-[36px]">Welcome back!</h1>

        <div className="w-full">
          <div>Email</div>
          <input
            name="email"
            type="email"
            className=" w-full h-[48px] p-[14px]"
            placeholder="Enter Email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            value={email}
          ></input>
        </div>

        <div className="w-full">
          <div>Password</div>
          <input
            name="password"
            className=" w-full h-[48px] p-[14px]"
            placeholder="Enter Password"
            type="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            value={password}
          ></input>
          {state.error && <div className="  text-red-600">Incorrect username or password</div>}
        </div>

        <button className=" bg-slate-300 w-full h-[60px]" type="submit">
          Log in
        </button>

        <div className="flex gap-[5px]">
          <div>Don’t have an account?</div>
          <Link href="/register">
            <div className=" text-[#2F5FAC] font-bold">Register</div>
          </Link>
        </div>
      </form>
    </>
  );
}
