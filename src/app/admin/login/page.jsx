"use client";

import CourseFlowIcon from "@/assets/images/CourseFlowIcon.svg";
import React from "react";
import { useState } from "react";
import { useAuth } from "@/contexts/authentication";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function adminRegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailOK, setIsEmailOK] = useState(true);
  const [isPasswordOk, setIsPasswordOk] = useState(true);
  const [isLoginOk, setIsLoginOk] = useState(true);
  const [emailStatus, setEmailStatus] = useState("");
  const [passwordStatus, setPasswordStatus] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [error, setError] = useState(false);
  //const { adminLogin } = useAuth();
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    const data = { email, password };
    setIsLoginOk(true);
    if (!email) {
      setIsEmailOK(false);
      setEmailStatus("Cannot be blanked");
    } else {
      setIsEmailOK(true);
      setEmailStatus("");
    }
    if (!password) {
      setIsPasswordOk(false);
      setPasswordStatus("Cannot be blanked");
    } else {
      setIsPasswordOk(true);
      setPasswordStatus("");
    }
    if (email && password) {
      try {
        const res = await signIn("credentials", {
          email: email,
          password: password,
          role: "admin",
          redirect: false,
        });
        if (res.error) {
          throw new Error("Failed to login");
        }
        router.replace("/admin/courselist");
      } catch {
        setError(true);
      }
    }
  }

  return (
    <section className="bg-gradient-to-r from-[#2558DD] to-[#5697FF] h-dvh flex justify-center items-center">
      <form
        className="flex flex-col p-[60px] gap-[40px] bg-white rounded-[8px]"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="flex flex-col items-center">
          <Image
            className="mb-[24px] w-[315px]"
            src={CourseFlowIcon}
            alt="course-flow-icon"
            priority
          />
          <p className="text-center text-[24px] text-[#646D89] font-bold leading-[30px]">
            Admin Control Panel
          </p>
        </div>

        <div className="flex flex-col relative">
          <label htmlFor="email">Email</label>
          <input
            className={`p-[12px] outline-none border border-solid border-[#D6D9E4] rounded-[8px] ${
              isEmailOK ? "" : "border border-solid border-red-600"
            } ${isLoginOk ? "" : "border border-solid border-red-600"}`}
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
          />
          {!isEmailOK ? (
            <p className="absolute top-[105%] text-red-600 text-[10px] text italic">
              {emailStatus}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col relative ">
          <label htmlFor="password">Password</label>
          <input
            className={`p-[12px] outline-none border border-solid border-[#D6D9E4] rounded-[8px] ${
              isEmailOK ? "" : "border border-solid border-red-600"
            } ${isLoginOk ? "" : "border border-solid border-red-600"}
            `}
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
          />
          {!isPasswordOk ? (
            <p className="absolute top-[105%] text-red-600 text-[10px] text italic">
              {passwordStatus}
            </p>
          ) : null}
        </div>
        <section className="relative flex justify-center w-full">
          <button className="bg-[#2F5FAC] px-[32px] py-[18px] rounded-[12px] text-[#fff] text-base w-full">
            Login
          </button>
          {!isLoginOk ? (
            <p className="absolute top-[105%] left-0 text-red-600 text-[12px] text italic">
              {loginStatus}
            </p>
          ) : null}
        </section>
      </form>
    </section>
  );
}
