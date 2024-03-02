"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/authentication";
import Image from "next/image";

const RegisterForm = () => {
  const [values, setValues] = useState({
    fullname: "",
    dateofBirth: "",
    EducationalBackground: "",
    email: "",
    password: "",
  });

  const { register } = useAuth();
  const [error, setError] = useState("");
  const [fullnameError, setfullnameError] = useState("");
  const [dateError, setDateError] = useState(false);
  const [emailError, setemailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [EducationalBackgroundError, setEducationalBackgroundError] =
    useState("");

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const validateDateofBirth = (date) => {
    const currentDate = new Date();
    const selectedDate = date ? new Date(date) : new Date(NaN);
    const ageDifference =
      currentDate.getFullYear() - selectedDate.getFullYear();

    const errors = {
      dateofBirth: ageDifference <= 6 || isNaN(selectedDate.getTime()),
    };

    setDateError((prevErrors) => ({
      ...prevErrors,
      ...errors,
    }));

    return errors.dateofBirth;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dateOfBirthError = validateDateofBirth(values.dateofBirth);
    const data = {
      ...values,
    };

    if (dateOfBirthError) {
      setDateError(
        "Please enter your date of birth and be at least 6 years old"
      );
    } else {
      setDateError("");
    }

    // ตรวจสอบข้อผิดพลาดอื่น ๆ และตั้งค่า state ตามปกติ

    if (!/^[a-zA-Z]+ (?:['-]?[a-zA-Z]+)?$/g.test(values.fullname.trim())) {
      setfullnameError("Please enter name");
    } else {
      setfullnameError("");
    }

    if (!values.EducationalBackground.trim()) {
      setEducationalBackgroundError("Please enter EducationalBackground");
    } else {
      setEducationalBackgroundError("");
    }

    if (!values.email.match(/^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)) {
      setemailError("Email is required");
    } else {
      setemailError("");
    }

    if (!values.password.trim()) {
      setPasswordError("Password is required");
    } else if (values.password.length < 12) {
      setPasswordError("Password must be at least 12 characters");
    } else {
      setPasswordError("");
    }
    if (
      data.fullname &&
      data.dateofBirth &&
      data.EducationalBackground &&
      data.email &&
      data.password !== ""
    ) {
      const response = await register(data);
    }
  };

  return (
    <>
      <img
        className="my-auto absolute pt-[20px] -z-20 top-0 w-full"
        src="/images/assets.png"
        alt="blackground"
      />
      <section className="flex gap-0.5 justify-between px-5 mt-24 items-start  w-full max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
        <div className="self-start rounded-full h-[73px] w-[73px]" />
        <section className="flex flex-col flex-1 items-center mt-16 max-md:mt-10 max-md:max-w-full">
          <div className="text-4xl font-medium tracking-tighter text-indigo-800 max-md:max-w-full">
            Register to start learning!
          </div>
          <form className="flex flex-col mt-9 ">
            <div className="flex flex-col relative">
              <label htmlFor="mt-9 text-black leading-[150%] max-md:max-w-full">
                Name
              </label>
              <input
                name="fullname"
                onChange={handleChange}
                value={values.fullname}
                placeholder="Enter Name and Lastname"
                className="mb-[40px]  h-12 pl-3 pr-4 py-3 bg-white rounded-lg border border-gray-300 justify-start items-start gap-2 inline-flex max-md:max-w-full"
              ></input>
              {fullnameError && (
                <p className="absolute top-[70%] text-red-600">
                  {fullnameError}
                </p>
              )}
            </div>
            <div className="flex flex-col relative">
              <label htmlFor="mt-10 text-black leading-[150%] max-md:max-w-full">
                Date of Birth
              </label>
              <input
                max={new Date().toISOString().split("T")[0]}
                name="dateofBirth"
                value={values.dateofBirth}
                onChange={handleChange}
                type="date"
                placeholder="DD/MM/YY"
                className="mb-[40px] w-[453px] h-12 pl-3 pr-4 py-3 bg-white rounded-lg border border-gray-300 justify-start items-start gap-2 inline-flex"
              ></input>
              {dateError && (
                <p className="absolute top-[70%] text-red-600">{dateError}</p>
              )}
            </div>

            <div className="flex flex-col relative">
              <label htmlFor="mt-10 text-black leading-[150%] max-md:max-w-full">
                Educational Background
              </label>
              <input
                name="EducationalBackground"
                onChange={handleChange}
                //value={values.EducationalBackground}
                type="text"
                placeholder="Enter Educational Background"
                className="mb-[40px] w-[453px] h-12 pl-3 pr-4 py-3 bg-white rounded-lg border border-gray-300 justify-start items-start gap-2 inline-flex"
              ></input>
              {EducationalBackgroundError && (
                <p className="absolute top-[70%] text-red-600">
                  {EducationalBackgroundError}
                </p>
              )}
            </div>

            <div className="flex flex-col relative">
              <label htmlFor="mt-10 text-black leading-[150%] max-md:max-w-full">
                Email
              </label>
              <input
                name="email"
                //value={values.email}
                onChange={handleChange}
                placeholder="Enter Email"
                className="mb-[40px] h-12 pl-3 pr-4 py-3 bg-white rounded-lg border border-gray-300 justify-center items-start gap-2 leading-[150%] text-slate-400 max-md:max-w-full"
              ></input>

              {emailError && (
                <p className="absolute top-[70%] text-red-600">{emailError}</p>
              )}
            </div>
            <div className="flex flex-col relative">
              <label htmlFor="mt-10 text-black leading-[150%] max-md:max-w-full">
                Password
              </label>
              <input
                name="password"
                //value={values.password}
                onChange={handleChange}
                placeholder="Enter password"
                type="password"
                className="justify-center p-3 mt-1 bg-white rounded-lg border border-solid border-[color:var(--gray-400,#D6D9E4)] leading-[150%] text-slate-400 max-md:max-w-full"
              ></input>

              {passwordError && (
                <p className="absolute top-[70%] text-red-600">
                  {passwordError}
                </p>
              )}
            </div>

            <button
              onClick={handleSubmit}
              className="justify-center items-center px-16 py-5 mt-10 font-bold text-center text-white whitespace-nowrap bg-blue-800 rounded-xl shadow-lg leading-[150%] max-md:px-5 max-md:max-w-full"
            >
              Register
            </button>
            <section className="flex gap-3 py-1 mt-10 leading-[150%] max-md:flex-wrap max-md:max-w-full">
              <div className="text-black whitespace-nowrap">
                Already have an account?
              </div>
              <Link href="/login">
                <button className="flex-auto whitespace-nowrap font-bold text-[16px] text-[#2F5FAC] not-italic px-[8px]">
                  Log in
                </button>
              </Link>
            </section>
          </form>
          <div className="my-auto rounded-full h-[35px] stroke-[3px] w-[35px]" />
        </section>
      </section>
    </>
  );
};

export default RegisterForm;
