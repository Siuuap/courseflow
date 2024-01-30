"use client";
import { useState } from "react";
import { useAuth } from "@/contexts/authentication";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [educationBackground, setEducationBackground] = useState("");

  const { register } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("dateOfBirth", dateOfBirth);
    formData.append("educationBackground", educationBackground);

    register(formData);
  };

  return (
    <>
      <form
        className="flex flex-col justify-between  items-start mx-[auto] p-[14px] max-w-[453px]  bg-slate-100"
        onSubmit={handleSubmit}
      >
        <h1 className="  bg-slate-200">Register to start learning!</h1>

        <div className="flex">
          <div className="flex flex-col">
            <div>First Name</div>
            <input
              name="firstName"
              placeholder="Enter Name"
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
              value={firstName}
            ></input>
          </div>

          <div className="flex flex-col">
            <div>Last Name</div>
            <input
              name="lastName"
              placeholder="Enter LastName"
              onChange={(event) => {
                setLastName(event.target.value);
              }}
              value={lastName}
            ></input>
          </div>
        </div>

        <div>
          <div>Data of Birth</div>
          <input
            name="dateOfBirth"
            placeholder="DD/MM/YY"
            onChange={(event) => {
              setDateOfBirth(event.target.value);
            }}
            value={dateOfBirth}
          ></input>
        </div>

        <div>
          <div>Educational Background</div>
          <input
            name="educationBackground"
            placeholder="Enter Educational Background"
            onChange={(event) => {
              setEducationBackground(event.target.value);
            }}
            value={educationBackground}
          ></input>
        </div>

        <div>
          <div>Email</div>
          <input
            name="email"
            placeholder="Enter Email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            value={email}
          ></input>
        </div>

        <div>
          <div>Password</div>
          <input
            name="password"
            placeholder="Enter password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            value={password}
          ></input>
        </div>

        <button className=" bg-slate-300" type="submit">
          Register
        </button>

        <div className="flex">
          <div>Already have an account?</div>
          <div>Log in</div>
        </div>
      </form>
    </>
  );
}
