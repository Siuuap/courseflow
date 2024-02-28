"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function UserLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const urlParams = window.location.search;
    let previous = "";

    if (urlParams.length !== 0) {
      previous = urlParams.split("?")[1].split("=")[1];
    }

    try {
      const res = await signIn("credentials", {
        email: email,
        password: password,
        role: "user",
        redirect: false,
      });

      if (res.error) {
        throw new Error("Failed to login");
      }

      router.push(`/${previous}`);
    } catch {
      setError(true);
    }
  };

  return (
    <>
      <NavBar />
      <Image
        className="absolute pt-[20px] -z-50 "
        src="/images/assets.png"
        alt="blackground"
        width={1459.64}
        height={839}
        priority={true}
      />
      <form
        className="flex flex-col justify-between  items-start gap-[50px] mx-[auto] p-[14px] max-w-[453px]  bg-slate-100 mt-[150px]"
        onSubmit={handleSubmit}
      >
        <h1 className="text-[36px] text-[#22269E] w">Welcome back!</h1>

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

          {error && (
            <div className="  text-red-600">Incorrect username or password</div>
          )}
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
