"use client";
import React, { useState } from "react";
import Button from "./Button";
import Link from "next/link";
const RegisterForm = () => {
  const [values, setValues] = useState({
    fullname: "",
    password: "",
    dateofBirth: "",
    EducationalBackground: "",
    email: "",
  });

  const getValue = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [errors, setErrors] = useState({
    fullname: false,
    password: false,
    passwordLength: false,
    dateofBirthempty: false,
    dateofBirth: false,
    email: false,
  });

  const checkName = (value) => {
    let fullname = value;
    fullname = fullname
      .split(" ")
      .filter((word) => word !== "")
      .join("");

    console.log(values);
    const englishRegex = /^[A-Za-z]+$/;

    const isValid = englishRegex.test(fullname);
    return isValid;
  };

  const validateDateofBirth = (date) => {
    const currentDate = new Date();
    const selectedDate = date ? new Date(date) : new Date(NaN);
    const ageDifference =
      currentDate.getFullYear() - selectedDate.getFullYear();

    const errors = {
      dateofBirth: ageDifference <= 6 || isNaN(selectedDate.getTime()),
    };

    setErrors((prevErrors) => ({
      ...prevErrors,
      ...errors,
    }));

    return errors.dateofBirth;
  };

  const validatePassword = (password) => {
    // Define regular expressions for password criteria
    const digitRegex = /\d/;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

    // Check if the password includes a number
    const hasDigit = digitRegex.test(password);

    // Check if the password includes optional criteria
    const hasUppercase = uppercaseRegex.test(password);
    const hasLowercase = lowercaseRegex.test(password);
    const hasSpecialChar = specialCharRegex.test(password);

    // Check if at least one optional criteria is met
    const hasOptionalCriteria = hasUppercase || hasLowercase || hasSpecialChar;

    // Check if the password meets the requirements
    if (hasDigit && hasOptionalCriteria) {
      return true; // Password is valid
    } else {
      return false; // Password is not valid
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setErrors({
      fullname: !checkName(values.fullname),
      password: !(values.password.trim() && values.password.length < 12),
      dateofBirthempty: !values.dateofBirth.trim(),
      dateofBirth: validateDateofBirth(values.dateofBirth),
      EducationalBackground: !values.eb.trim(),
      email: !(values.email.trim() && values.email.includes("@")),
    });
  };

  return (
    <section className="flex gap-0.5 justify-between items-start px-5  w-full max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
      <section className="flex flex-col flex-1 items-center mt-16 max-md:mt-10 max-md:max-w-full">
        <div className="text-4xl font-medium tracking-tighter text-indigo-800 max-md:max-w-full">
          Register to start learning!
        </div>
        <form className="flex flex-col mt-9 ">
          <label htmlFor=" text-black  max-md:max-w-full">Name</label>
          <input
            name="fullname"
            onChange={getValue}
            value={values.fullname}
            placeholder="Enter Name and Lastname"
            className="gap-[40px] w-[453px] h-12 pl-3 pr-4 py-3 bg-white rounded-lg border border-gray-300 justify-start items-start gap-2 inline-flex"
          ></input>
          {errors.fullname && (
            <span className="text-red-600">กรุณากรอกชื่อ</span>
          )}

          <label htmlFor="text-[16px] mb-[4px]">Date of Birth</label>
          <input
            name="dateofBirth"
            value={values.dateofBirth}
            onChange={getValue}
            type="date"
            placeholder="DD/MM/YY"
            className="mb-[40px] w-[453px] h-12 pl-3 pr-4 py-3 bg-white rounded-lg border border-gray-300 justify-start items-start gap-2 inline-flex"
          ></input>
          {errors.dateofBirthempty && (
            <div className="text-red-600">Please enter your date of birth</div>
          )}
          {errors.dateofBirth && (
            <div className="text-red-600">You must be at least 6 years old</div>
          )}
          <label htmlFor="text-[16px] mb-[4px]">Educational Background</label>
          <input
            name="EducationalBackground"
            onChange={getValue}
            value={values.EducationalBackground}
            type="text"
            placeholder="Enter Educational Background"
            className="mb-[40px] w-[453px] h-12 pl-3 pr-4 py-3 bg-white rounded-lg border border-gray-300 justify-start items-start gap-2 inline-flex"
          ></input>
          {errors.fullname && (
            <p className=" mt-[50px]  text-red-600">กรุณากรอกข้อมูล</p>
          )}
          <label htmlFor="text-[16px] mb-[4px]">Email</label>
          <input
            name="email"
            value={values.email}
            onChange={getValue}
            placeholder="Enter Email"
            className="mb-[40px] w-[453px] h-12 pl-3 pr-4 py-3 bg-white rounded-lg border border-gray-300 justify-start items-start gap-2 inline-flex"
          ></input>
          {errors.password && <p className=" text-red-600">กรุณากรอก email</p>}
          <label htmlFor="text-[16px] mb-[4px]">Password</label>
          <input
            name="password"
            value={values.password}
            onChange={getValue}
            placeholder="Enter password"
            type="password"
            className="mb-[40px] w-[453px] h-12 pl-3 pr-4 py-3 bg-white rounded-lg border border-gray-300 justify-start items-start gap-2 inline-flex"
          ></input>
          {errors.password && (
            <p className=" text-red-600">กรุณากรอกพาสเวิร์ด</p>
          )}
          <button
            onClick={handleSubmit}
            className="mb-[40px] w-[453px] h-[60px] px-8 py-[18px] bg-blue-800 rounded-xl shadow justify-center items-center gap-2.5 inline-flex"
          >
            Register
          </button>
          <section className="flex flex-row gap-[4px]">
            <div>Already have an account?</div>
            <Link href="/login">
              <button className="text-[16px] text-[#2F5FAC] not-italic px-[8px]">
                Log in
              </button>
            </Link>
          </section>
        </form>
      </section>
    </section>
  );
};

export default RegisterForm;
