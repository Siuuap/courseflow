"use client";
import React, { useState } from "react";
import Button from "./Button";

const RegisterForm = () => {
  const [values, setValues] = useState({
    fullname: "",
    password: "",
    dateofBirth: "",
    eb: "",
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

  const handleSubmit = (event) => {
    event.preventDefault();

    setErrors({
      fullname: !values.fullname.trim(),
      password: !values.password.trim(),
      passwordLength: values.password.length < 8,
      dateofBirthempty: !values.dateofBirth.trim(),
      dateofBirth: validateDateofBirth(values.dateofBirth),
      eb: !values.eb.trim(),
      email: !(values.email.trim() && values.email.includes("@")),
    });
  };

  return (
    <section className="flex gap-0.5 justify-between items-start px-5 mt-24 w-full max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
      <section className="flex flex-col flex-1 items-center mt-16 max-md:mt-10 max-md:max-w-full">
        <div className="text-4xl font-medium tracking-tighter text-indigo-800 max-md:max-w-full">
          Register to start learning!
        </div>
        <form className="flex flex-col mt-9">
          <label htmlFor=" text-black  max-md:max-w-full">
            Name
          </label>
          <input
            name="fullname"
            onChange={getValue}
            value={values.fullname}
            placeholder="Enter Name and Lastname"
            className="mb-[40px] w-[453px] h-12 pl-3 pr-4 py-3 bg-white rounded-lg border border-gray-300 justify-start items-start gap-2 inline-flex"
          ></input>
          {errors.fullname && (
            <p className=" mt-[50px]  text-red-600">กรุณากรอกชื่อ</p>
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
            <div className="    -mt-[50px]  text-red-600">
              Please enter your date of birth
            </div>
          )}
          {errors.dateofBirth && (
            <div className="    -mt-[50px]  text-red-600">
              You must be at least 6 years old
            </div>
          )}
          <label htmlFor="text-[16px] mb-[4px]">Educational Background</label>
          <input
            name="eb"
            onChange={getValue}
            value={values.eb}
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
            onChange={getValue}
            placeholder="Enter Email"
            className="mb-[40px] w-[453px] h-12 pl-3 pr-4 py-3 bg-white rounded-lg border border-gray-300 justify-start items-start gap-2 inline-flex"
          ></input>
          {errors.email && <p>{errors.email.message}</p>}
          <label htmlFor="text-[16px] mb-[4px]">Password</label>
          <input
            name="password"
            onChange={getValue}
            placeholder="Enter password"
            type="password"
            className="mb-[40px] w-[453px] h-12 pl-3 pr-4 py-3 bg-white rounded-lg border border-gray-300 justify-start items-start gap-2 inline-flex"
          ></input>
          <button
            onClick={handleSubmit}
            className="mb-[40px] w-[453px] h-[60px] px-8 py-[18px] bg-blue-800 rounded-xl shadow justify-center items-center gap-2.5 inline-flex"
          >
            Register
          </button>
          <section className="flex flex-row gap-[4px]">
            <div>Already have an account?</div>
            <button className="text-[16px] text-[#2F5FAC] not-italic px-[8px]">
              Log in
            </button>
          </section>
        </form>
      </section>
    </section>
  );
};

export default RegisterForm;
