"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import Image from "next/image";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function EditProfileForm() {
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    dateofBirth: "",
    EducationalBackground: "",
    email: "",
  });

  const [userId, setUserId] = useState([]);

  const [image, setImage] = useState("");

  const getValue = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [errors, setErrors] = useState({
    firstname: false,
    lastname: false,
    dateofBirthempty: false,
    dateofBirth: false,
    email: false,
  });

  const checkFirstName = (value) => {
    let firstname = value;
    //console.log(values);
    const englishRegex = /^[A-Za-z]+$/;

    const isValid = englishRegex.test(firstname);
    return isValid;
  };

  const checkLastName = (value) => {
    let lastname = value;
    //console.log(values);
    const englishRegex = /^[A-Za-z]+$/;

    const isValid = englishRegex.test(lastname);
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
      firstname: !checkFirstName(values.firstname),
      lastname: !checkLastName(values.lastname),
      dateofBirthempty: !values.dateofBirth.trim(),
      dateofBirth: validateDateofBirth(values.dateofBirth),
      EducationalBackground: !values.eb.trim(),
      email: !(values.email.trim() && values.email.includes("@")),
      image: !values.image.trim(),
    });
  };

  const { data: session, status } = useSession();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({});
  // const []

  const getUser = async () => {
    console.log(session);
    //console.log(userData);

    if (status === "authenticated") {
      const id = session?.user.userId;
      const res = await axios.get(`/api/user/${id}`);
      setUserData({
        ...session.user,
      });
      setUserProfile(res.data.data);
      console.log(res.data.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getUser();
  }, [status]);

  // async function deleteImage(userId) {
  //   const id = userId;
  //   try {
  //     await axios.delete({ img_url });
  //     setUserProfile();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // console.log(userProfile);
  // useEffect(() => {
  //   getUser();
  // });

  const deleteImage = (event) => {
    event.preventDefault();
    delete userProfile.img_url;
    setImage({ ...image });
  };

  // const handleRemoveImage = (event, avatarKey) => {
  //   event.preventDefault();
  //   delete avatars[avatarKey];
  //   setAvatars({ ...avatars });
  // };

  // async function fetchUserId() {
  //   if (session?.user.userId != undefined) {
  //     const id = session?.user.userId;
  //     const res = await axios.get(`/api/user/${id}`);
  //     setUserId(res.data.data);
  //   }
  // }

  // useEffect(() => fetchUserId(), [session?.user?.userId]);
  // console.log(session?.user.userId);
  //console.log(userId);

  return (
    <>
      <NavBar />
      <section className="relative flex gap-0.5 justify-between items-start px-5 w-full h-[955px] max-md:flex-wrap max-md:mt-10 max-md:max-w-full mx-[auto]">
        <Image
          className="absolute pt-[100px] pl-[43px]"
          src="/images/editProfile.png"
          alt="editProfile"
          width={1397}
          height={190}
          priority={true}
        />
        <section className="flex flex-col flex-1 items-center max-md:max-w-full">
          <div className="text-4xl mt-[100px] font-medium tracking-tighter text-black max-md:max-w-full">
            Profile
          </div>
          <div className="flex flex-row w-[930px] h-[531px] mt-[72px]">
            <div className="bg-blue-100 w-[358px] h-[358px] rounded-[16px] flex justify-center items-center">
              <img
                className="absolute rounded-[16px]"
                src={userProfile?.img_url}
                alt="image_profile"
                width={358}
                height={358}
              />
              <button
                className="absolute left-[590px] top-[223px] w-[32px] h-[32px] rounded-3xl bg-[#9B2FAC] text-white"
                onClick={() => {
                  deleteImage(userId);
                }}>
                x
              </button>
            </div>
            <form className="absolute flex flex-col pl-[477px]">
              <div className="flex flex-row">
                <div className="flex flex-col pr-[13px]">
                  <label
                    htmlFor="userId"
                    className="pb-[4px] text-black text-[16px] max-md:max-w-full">
                    Firstname
                  </label>
                  <input
                    id="userId"
                    name="firstname"
                    onChange={getValue}
                    value={values.firstname}
                    placeholder={userProfile?.first_name || "Enter firstName"}
                    className="mb-[40px] w-[220px] h-12 pl-3 pr-4 py-3 bg-white rounded-lg border border-gray-300 justify-start items-start gap-2 inline-flex"></input>
                  {errors.firstname && (
                    <span className="text-red-600">กรุณากรอกชื่อ</span>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="userId"
                    className="pb-[4px] text-black text-[16px] max-md:max-w-full">
                    Lastname
                  </label>
                  <input
                    name="Lastname"
                    onChange={getValue}
                    value={values.Lastname}
                    // placeholder={session?.user?.lastName || "Enter lastname"}
                    placeholder={userProfile?.last_name || "Enter lastName"}
                    className="mb-[40px] w-[220px] h-12 pl-3 pr-4 py-3 bg-white rounded-lg border border-gray-300 justify-start items-start gap-2 inline-flex"></input>
                  {errors.Lastname && (
                    <span className="text-red-600">กรุณากรอกนามสกุล</span>
                  )}
                </div>
              </div>
              <label
                htmlFor="userId"
                className="pb-[4px] text-black text-[16px] max-md:max-w-full">
                Date of Birth
              </label>
              console.log({userProfile?.date_of_birth}); console.log(
              {values.dateofBirth});
              <input
                name="dateofBirth"
                value={values.dateofBirth}
                onChange={getValue}
                type="date"
                // placeholder={session?.user?.dateofBirth || "Enter DD/MM/YY"}
                placeholder={userProfile?.date_of_birth || "Enter YYYY-MM-DD"}
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
              <label
                htmlFor="userId"
                className="pb-[4px] text-black text-[16px] max-md:max-w-full">
                Educational Background
              </label>
              <input
                name="EducationalBackground"
                onChange={getValue}
                value={values.EducationalBackground}
                type="text"
                // placeholder="Enter Educational Background"
                placeholder={
                  userProfile?.educational_background ||
                  "Enter educational background"
                }
                className="mb-[40px] w-[453px] h-12 pl-3 pr-4 py-3 bg-white rounded-lg border border-gray-300 justify-start items-start gap-2 inline-flex"></input>
              {errors.firstname && (
                <p className=" mt-[50px]  text-red-600">กรุณากรอกข้อมูล</p>
              )}
              <label
                htmlFor="userId"
                className="pb-[4px] text-black text-[16px] max-md:max-w-full">
                Email
              </label>
              <input
                name="email"
                value={values.email}
                onChange={getValue}
                // placeholder="Enter Email"
                placeholder={session?.user?.email || "Enter email"}
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
      </section>

      <Footer />
    </>
  );
}
