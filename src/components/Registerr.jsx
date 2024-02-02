import Image from "next/image";
import React from "react";

function Registerr() {
  return (
    <div className="flex flex-col pb-12 text-base bg-white">
      <div className="flex justify-center items-center px-16 w-full font-bold text-center bg-white shadow-sm leading-[150%] max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 justify-between w-full max-w-[1120px] max-md:flex-wrap max-md:max-w-full">
          <Image
            // loading="lazy"
            src=""
            alt=""
            className="my-auto max-w-full aspect-[9.09] fill-[linear-gradient(110deg,#95BEFF_18.21%,#0040E5_95.27%)] w-[140px]"
          />
          <div className="flex gap-5 justify-between py-3.5 pl-6">
            <div className="my-auto text-violet-950">Our Courses</div>
            <div className="justify-center px-8 py-5 text-white whitespace-nowrap bg-blue-800 rounded-xl shadow-lg max-md:px-5">
              Log in
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-0.5 justify-between items-start px-5 mt-24 w-full max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
        <Image
          // loading="lazy"
          src=""
          alt=""
          className="my-auto aspect-[0.22] fill-amber-500 w-[93px]"
        />
        <div className="self-start rounded-full h-[73px] w-[73px]" />
        <div className="flex flex-col flex-1 self-end mt-16 max-md:mt-10 max-md:max-w-full">
          <div className="text-4xl font-medium tracking-tighter text-indigo-800 max-md:max-w-full">
            Register to start learning!
          </div>
          <div className="mt-9 text-black leading-[150%] max-md:max-w-full">
            Name
          </div>
          <div className="justify-center p-3 mt-1 bg-white rounded-lg border border-solid border-[color:var(--gray-400,#D6D9E4)] leading-[150%] text-slate-400 max-md:max-w-full">
            Enter Name and Lastname
          </div>
          <div className="mt-10 text-black leading-[150%] max-md:max-w-full">
            Date of Birth
          </div>
          <div className="flex gap-2 justify-between px-4 py-3 mt-1 whitespace-nowrap bg-white rounded-lg border border-solid border-[color:var(--gray-400,#D6D9E4)] leading-[150%] text-slate-400 max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
            <div className="flex-auto max-md:max-w-full">DD/MM/YY</div>
          </div>
          <div className="mt-10 text-black leading-[150%] max-md:max-w-full">
            Educational Background
          </div>
          <div className="justify-center p-3 mt-1 bg-white rounded-lg border border-solid border-[color:var(--gray-400,#D6D9E4)] leading-[150%] text-slate-400 max-md:max-w-full">
            Enter Educational Background
          </div>
          <div className="mt-10 text-black leading-[150%] max-md:max-w-full">
            Email
          </div>
          <div className="justify-center p-3 mt-1 bg-white rounded-lg border border-solid border-[color:var(--gray-400,#D6D9E4)] leading-[150%] text-slate-400 max-md:max-w-full">
            Enter Email
          </div>
          <div className="mt-10 text-black leading-[150%] max-md:max-w-full">
            Password
          </div>
          <div className="justify-center p-3 mt-1 bg-white rounded-lg border border-solid border-[color:var(--gray-400,#D6D9E4)] leading-[150%] text-slate-400 max-md:max-w-full">
            Enter password
          </div>
          <div className="justify-center items-center px-16 py-5 mt-10 font-bold text-center text-white whitespace-nowrap bg-blue-800 rounded-xl shadow-lg leading-[150%] max-md:px-5 max-md:max-w-full">
            Register
          </div>
          <div className="flex gap-3 justify-between py-1 mt-10 leading-[150%] max-md:flex-wrap max-md:max-w-full">
            <div className="grow text-black whitespace-nowrap">
              Already have an account?
            </div>
            <div className="flex-auto font-bold text-blue-800">Log in</div>
          </div>
        </div>
        <div className="my-auto rounded-full h-[35px] stroke-[3px] w-[35px]" />
      </div>
    </div>
  );
}

export default Registerr;
