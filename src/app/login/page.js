"use client";
import axios from "axios";

export default function Home() {
  return (
    <>
      <form
        className="flex flex-col justify-between  items-start mx-[auto] p-[14px] max-w-[453px]  bg-slate-100"
      >
        <h1 className="  bg-slate-200">Welcome back!</h1>

        <div>
          <div>email</div>
          <input name = "email" placeholder="Enter Email"></input>
        </div>

        <div>
          <div>password</div>
          <input name = "password" placeholder="Enter Password"></input>
        </div>

        <button className=" bg-slate-300" type="submit">
          Log in
        </button>

        <div className="flex">
          <div>Don’t have an account?</div>
          <div>Register</div>
        </div>
      </form>
    </>
  );
}
