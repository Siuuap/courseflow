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
  const [nameValid, setnameValid] = useState(false);
  const [dateValid, setdateValid] = useState(false);
  const [emailValid, setemailValid] = useState(false);
  const [passwordlValid, setPasswordValid] = useState(false);
  const [educationValid, seteducationValid] = useState(false);

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
      setdateValid(false);
    } else {
      setDateError("");
      setdateValid(true);
    }

    // ตรวจสอบข้อผิดพลาดอื่น ๆ และตั้งค่า state ตามปกติ

    if (!/^[a-zA-Z]+ (?:['-]?[a-zA-Z]+)?$/g.test(values.fullname.trim())) {
      setfullnameError("Please enter name");
      setnameValid(false);
    } else {
      setfullnameError("");
      setnameValid(true);
    }

    if (!values.EducationalBackground.trim()) {
      setEducationalBackgroundError("Please enter Educational Background");
      seteducationValid(false);
    } else {
      setEducationalBackgroundError("");
      seteducationValid(true);
    }

    if (!values.email.match(/^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)) {
      setemailError("Email is required");
      setemailValid(false);
    } else {
      setemailError("");
      setemailValid(true);
    }

    if (!values.password.trim()) {
      setPasswordError("Password is required");
      setPasswordValid(false);
    } else if (values.password.length < 12) {
      setPasswordError("Password must be at least 12 characters");
      setPasswordValid(false);
    } else {
      setPasswordError("");
      setPasswordValid(true);
    }
    if (
      (nameValid,
      dateValid,
      educationValid,
      emailValid,
      passwordlValid === true)
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
      <section className="flex flex-col flex-1 items-center mt-40 pb-40 max-[375px]:w-[80%]">
        <div className="text-4xl font-medium tracking-tighter text-indigo-800">
          Register to start learning!
        </div>
        <form className="flex flex-col mt-9 ">
          <div className="flex flex-col relative">
            <label htmlFor="mt-9 text-black leading-[150%]">Name</label>
            <input
              name="fullname"
              onChange={handleChange}
              value={values.fullname}
              placeholder="Enter Name and Lastname"
              className="mb-[40px] w-[453px] h-12 pl-3 pr-4 py-3 bg-white rounded-lg border border-gray-300 justify-start items-start"
            ></input>
            {fullnameError && (
              <p className="absolute top-[70%] text-red-600">{fullnameError}</p>
            )}
          </div>
          <div className="flex flex-col relative">
            <label htmlFor="mt-10 text-black leading-[150%]">
              Date of Birth
            </label>
            <input
              max={new Date().toISOString().split("T")[0]}
              name="dateofBirth"
              value={values.dateofBirth}
              onChange={handleChange}
              type="date"
              placeholder="DD/MM/YY"
              className="mb-[40px] w-[453px] h-12 pl-3 pr-4 py-3 bg-white rounded-lg border border-gray-300 justify-start items-start"
            ></input>
            {dateError && (
              <p className="absolute top-[70%] text-red-600">{dateError}</p>
            )}
          </div>

          <div className="flex flex-col relative">
            <label htmlFor="mt-10 text-black leading-[150%]">
              Educational Background
            </label>
            <input
              name="EducationalBackground"
              onChange={handleChange}
              type="text"
              placeholder="Enter Educational Background"
              className="mb-[40px] w-[453px] h-12 pl-3 pr-4 py-3 bg-white rounded-lg border border-gray-300 justify-start items-start"
            ></input>
            {EducationalBackgroundError && (
              <p className="absolute top-[70%] text-red-600">
                {EducationalBackgroundError}
              </p>
            )}
          </div>

          <div className="flex flex-col relative">
            <label htmlFor="mt-10 text-black leading-[150%]">Email</label>
            <input
              name="email"
              onChange={handleChange}
              placeholder="Enter Email"
              className="mb-[40px] w-[453px] h-12 pl-3 pr-4 py-3 bg-white rounded-lg border border-gray-300 justify-center items-start gap-2 leading-[150%] text-slate-400"
            ></input>

            {emailError && (
              <p className="absolute top-[70%] text-red-600">{emailError}</p>
            )}
          </div>
          <div className="flex flex-col relative">
            <label htmlFor="mt-10 text-black leading-[150%]">Password</label>
            <input
              name="password"
              onChange={handleChange}
              placeholder="Enter password"
              type="password"
              className="mb-[40px] w-[453px] h-12 pl-3 pr-4 py-3 bg-white rounded-lg border border-gray-300 justify-center items-start gap-2 leading-[150%] text-slate-400"
            ></input>

            {passwordError && (
              <p className="absolute top-[70%] text-red-600">{passwordError}</p>
            )}
          </div>

          <button
            onClick={handleSubmit}
            className="justify-center items-center px-16 py-5 mt-10 font-bold text-white whitespace-nowrap bg-blue-800 rounded-xl shadow-lg leading-[150%]"
          >
            Register
          </button>
          <section className="flex gap-3 py-1 mt-10 leading-[150%]">
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
      </section>
    </>
  );
};

export default RegisterForm;
