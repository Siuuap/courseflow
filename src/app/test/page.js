"use client";
import React, { useState } from "react";

const RegisterForm = () => {
  const [values, setValues] = useState({
    fullname: "",
    password: "",
    dateofBirth: "",
    email: "",
  });
  console.log(values.fullname);
  const getValue = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  //console.log(values);
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
      email: !(values.email.trim() && values.email.includes("@")),
    });
  };

  return (
    <section className="flex flex-col flex-1  mt-16 max-md:mt-10 max-md:max-w-full">
      <section className="flex flex-col flex-1 items-center mt-16 max-md:mt-10 max-md:max-w-full">
        <div className="text-4xl font-medium tracking-tighter text-indigo-800 max-md:max-w-full">
          Register to start learning!
        </div>
        <form className="flex flex-col">
          <label htmlFor="mt-9 text-black leading-[150%] max-md:max-w-full">
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
            <p className="    -mt-[50px]  text-red-600">
              Please enter your date of birth
            </p>
          )}
          {errors.dateofBirth && (
            <p className="    -mt-[50px]  text-red-600">
              You must be at least 18 years old
            </p>
          )}
          <label htmlFor="text-[16px] mb-[4px]">Educational Background</label>
          <input
            onChange={getValue}
            type="text"
            placeholder="Enter Educational Background"
            className="mb-[40px] w-[453px] h-12 pl-3 pr-4 py-3 bg-white rounded-lg border border-gray-300 justify-start items-start gap-2 inline-flex"
          ></input>
          <label htmlFor="text-[16px] mb-[4px]">Email</label>
          <input
            onChange={getValue}
            placeholder="Enter Email"
            className="mb-[40px] w-[453px] h-12 pl-3 pr-4 py-3 bg-white rounded-lg border border-gray-300 justify-start items-start gap-2 inline-flex"
          ></input>
          {errors.email && <p>{errors.email.message}</p>}
          <label htmlFor="text-[16px] mb-[4px]">Password</label>
          <input
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
