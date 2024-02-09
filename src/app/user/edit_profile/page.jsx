"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBarTemp";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import Image from "next/image";

export default function EditProfileForm() {
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

  const handleSubmit = (event) => {
    event.preventDefault();

    setErrors({
      fullname: !checkName(values.fullname),
      dateofBirthempty: !values.dateofBirth.trim(),
      dateofBirth: validateDateofBirth(values.dateofBirth),
      EducationalBackground: !values.eb.trim(),
      email: !(values.email.trim() && values.email.includes("@")),
    });
  };

  return (
    <>
      <NavBar />
      <section className="relative flex gap-0.5 justify-between items-start px-5 w-full h-[955px] max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
        <section className="flex flex-col flex-1 items-center max-md:max-w-full">
          <div className="text-4xl mt-[100px] font-medium tracking-tighter text-black max-md:max-w-full">
            Profile
          </div>
          <div className="flex flex-row w-[930px] h-[531px] mt-[72px]">
            <div className="bg-blue-100 w-[358px] h-[358px] rounded-[16px]"></div>
            <form className="flex flex-col pl-[119px]">
              <div className="flex flex-row">
                <div className="flex flex-col pr-[13px]">
                  <label
                    htmlFor=" text-black text-[16px] max-md:max-w-full"
                    className="pb-[4px]">
                    Firstname
                  </label>
                  <input
                    name="fullname"
                    onChange={getValue}
                    value={values.fullname}
                    // placeholder="Enter Name and Lastname"
                    className="mb-[40px] w-[220px] h-12 pl-3 pr-4 py-3 bg-white rounded-lg border border-gray-300 justify-start items-start gap-2 inline-flex"></input>
                  {errors.fullname && (
                    <span className="text-red-600">กรุณากรอกชื่อ</span>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor=" text-black text-[16px] max-md:max-w-full"
                    className="pb-[4px]">
                    Lastname
                  </label>
                  <input
                    name="fullname"
                    onChange={getValue}
                    value={values.fullname}
                    // placeholder="Enter Name and Lastname"
                    className="mb-[40px] w-[220px] h-12 pl-3 pr-4 py-3 bg-white rounded-lg border border-gray-300 justify-start items-start gap-2 inline-flex"></input>
                  {errors.fullname && (
                    <span className="text-red-600">กรุณากรอกชื่อ</span>
                  )}
                </div>
              </div>

              <label htmlFor="text-[16px] mb-[4px]" className="pb-[4px]">
                Date of Birth
              </label>
              <input
                name="dateofBirth"
                value={values.dateofBirth}
                onChange={getValue}
                type="date"
                // placeholder="DD/MM/YY"
                className="mb-[40px] w-[453px] h-12 pl-3 pr-4 py-3 bg-white rounded-lg border border-gray-300 justify-start items-start gap-2 inline-flex"></input>
              {errors.dateofBirthempty && (
                <div className="text-red-600">
                  Please enter your date of birth
                </div>
              )}
              {errors.dateofBirth && (
                <div className="text-red-600">
                  You must be at least 6 years old
                </div>
              )}
              <label htmlFor="text-[16px] mb-[4px]" className="pb-[4px]">
                Educational Background
              </label>
              <input
                name="EducationalBackground"
                onChange={getValue}
                value={values.EducationalBackground}
                type="text"
                // placeholder="Enter Educational Background"
                className="mb-[40px] w-[453px] h-12 pl-3 pr-4 py-3 bg-white rounded-lg border border-gray-300 justify-start items-start gap-2 inline-flex"></input>
              {errors.fullname && (
                <p className=" mt-[50px]  text-red-600">กรุณากรอกข้อมูล</p>
              )}
              <label htmlFor="text-[16px] mb-[4px]" className="pb-[4px]">
                Email
              </label>
              <input
                name="email"
                value={values.email}
                onChange={getValue}
                // placeholder="Enter Email"
                className="mb-[40px] w-[453px] h-12 pl-3 pr-4 py-3 bg-white rounded-lg border border-gray-300 justify-start items-start gap-2 inline-flex"></input>
              {errors.password && (
                <p className=" text-red-600">กรุณากรอก email</p>
              )}

              <Button
                onClick={handleSubmit}
                className="mb-[40px] w-[453px] h-[60px] px-8 py-[18px] bg-[#2F5FAC] rounded-xl shadow justify-center items-center gap-2.5 inline-flex text-white">
                Update Profile
              </Button>
            </form>
          </div>
        </section>
        <Image
          className="absolute pt-[100px] pl-[43px]"
          src="/images/editProfile.png"
          alt="editProfile"
          width={1397}
          height={190}
        />
      </section>
      <section className="absolute"></section>
      <Footer />
    </>
  );
}
