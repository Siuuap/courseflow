"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import { useLessonContext } from "@/contexts/lessonContext";
import uploadImage from "@/assets/images/uploadImage.svg";
import CancelIcon from "@/assets/images/CancelIcon.svg";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { supabase } from "@/utils/db";

export default function EditProfileForm() {
  const router = useRouter();
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    dateOfBirth: "",
    EducationalBackground: "",
    email: "",
    image: "",
  });

  const [error, setError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [dateError, setDateError] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [EducationalBackgroundError, setEducationalBackgroundError] =
    useState("");

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const { data: session, status, update } = useSession();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({});
  console.log(session);
  const [userId, setUserId] = useState(session?.user?.userId);
  const [firstName, setFirstName] = useState(userProfile?.first_name);
  const [lastName, setLastName] = useState(userProfile?.last_name);
  const [dateOfBirth, setDateOfBirth] = useState(userProfile?.date_of_birth);
  const [education, setEducation] = useState(
    userProfile?.educational_background
  );
  const [email, setEmail] = useState(userProfile?.email);
  const [image, setImage] = useState("");

  const [firstNameStatus, setFirstNameStatus] = useState("");
  const [lastNameStatus, setLastNameStatus] = useState("");
  const [dateOfBirthStatus, setDateOfBirthStatus] = useState("");
  const [educationStatus, setEducationStatus] = useState("");
  const [emailStatus, setEmailStatus] = useState("");
  const [imageStatus, setImageStatus] = useState("");
  const [latestUserData, setLatestUserData] = useState("");

  function handleRemoveImage(e, index) {
    console.log(index);
  }

  const [errors, setErrors] = useState({
    firstname: false,
    lastname: false,
    dateOfBirthempty: false,
    dateOfBirth: false,
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

  const validateDateOfBirth = (date) => {
    const currentDate = new Date();
    const selectedDate = date ? new Date(date) : new Date(NaN);
    const ageDifference =
      currentDate.getFullYear() - selectedDate.getFullYear();

    const errors = {
      dateOfBirth: ageDifference <= 6 || isNaN(selectedDate.getTime()),
    };
    console.log(errors);

    setDateError((prevErrors) => ({
      ...prevErrors,
      ...errors,
    }));

    return errors.dateOfBirth;
  };

  function findFilePathNames(i) {
    const item = i + "";
    const publicIndex = item.split("/").findIndex((el) => el === "public");
    const data = item
      .split("/")
      .filter((el, i) => {
        if (i > publicIndex + 1) {
          return el;
        }
      })
      .join("/");

    return data;
  }

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

      const data = res.data.data;

      setUserId(session?.user?.userId);
      setFirstName(data?.first_name);
      setLastName(data?.last_name);
      setDateOfBirth(data?.date_of_birth);
      setEducation(data?.educational_background);
      setEmail(data?.email);
      setImage(data?.img_url);
      setLatestUserData(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getUser();
  }, [status]);

  function setStatusToDefault() {
    setFirstNameStatus("");
    setLastNameStatus("");
    setDateOfBirthStatus("");
    setEducationStatus("");
    setEmailStatus("");
    setImageStatus("");
  }

  function handleImage(e) {
    if (e.target.files[0].size > 5000000) {
      setImageStatus("File size should be less than 5MB");
      return;
    }
    setImage(e.target.files[0]);
    console.log(e.target.files[0]);
  }

  const handleUpdateProfile = async (event) => {
    setStatusToDefault;
    event.preventDefault();

    // ของที่จะส่ง put ไป update ที่หลังบ้าน
    const userData = {
      user_id: userId,
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      education: education,
      email: email,
      image: image,
    };
    console.log(`Data before put`, userData);

    const dateOfBirthError = validateDateOfBirth(dateOfBirth);

    if (dateOfBirthError) {
      setDateError(
        "Please enter your date of birth and be at least 6 years old"
      );
    } else {
      setDateError("");
    }

    // ตรวจสอบข้อผิดพลาดอื่น ๆ และตั้งค่า state ตามปกติ
    if (!/^[a-zA-Z]+(?:['-]?[a-zA-Z]+)?$/.test(firstName.trim())) {
      setFirstNameError("Please enter firstname");
    } else {
      setFirstNameError("");
    }

    if (!/^[a-zA-Z]+(?:['-]?[a-zA-Z]+)?$/.test(lastName.trim())) {
      setLastNameError("Please enter lastname");
    } else {
      setLastNameError("");
    }

    if (!education.trim()) {
      setEducationalBackgroundError("Please enter EducationalBackground");
    } else {
      setEducationalBackgroundError("");
    }

    if (!email.match(/^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)) {
      setEmailError("Email is required");
    } else {
      setEmailError("");
    }

    if (typeof image === "object") {
      const fileName = findFilePathNames(latestUserData.img_url);

      // remove old image from storage
      try {
        const { data, error } = await supabase.storage
          .from(`users`)
          .remove(fileName);
        if (error) {
          console.log(`error remove old image from supabase`, error);
        }
      } catch (error) {
        console.log(error);
      }

      // upload image
      try {
        // console.log(image.name);
        const { data, error } = await supabase.storage
          .from("users")
          .upload(`id${userId}/image/${image.name}`, image, {
            cacheControl: "3600",
            upsert: true,
          });

        userData.img_url = supabase.storage
          .from("users")
          .getPublicUrl(data.path, image).data.publicUrl;
      } catch (error) {
        console.log(error);
      }
      console.log(userData);
    }

    try {
      if (
        userData.firstName &&
        userData.lastName &&
        userData.dateOfBirth &&
        userData.education &&
        userData.email &&
        userData.image !== ""
      ) {
        const res = await axios.put(`/api/user/${userId}`, userData);
        console.log(`test`, res);
        console.log(res.data.result[0].img_url);
        await update({
          ...session,
          user: {
            ...session.user,
            firstName,
            url: res.data.result[0].img_url,
          },
        });
        router.refresh();
        console.log(image);

        console.log(session);
      }
    } catch (error) {
      console.log(error);
    }
    //console.log(req.img_url);

    //router.refresh(NavBar);
  };

  return (
    <>
      <NavBar />

      <section className="flex gap-0.5 justify-between items-start px-5 w-full h-[955px] max-md:flex-wrap max-md:mt-10 max-md:max-w-full mx-[auto]">
        <Image
          className="absolute pt-[100px] pl-[43px] -z-50"
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
            <div className="relative bg-blue-100 w-[358px] h-[358px] rounded-[16px] flex justify-center items-center">
              <section className="relative flex flex-col gap-[8px]">
                {typeof image === "string" ? (
                  <div className="relative w-fit">
                    <img
                      src={image}
                      alt={image.name}
                      className="w-[358px] h-[358px] rounded-[16px] z-20"
                      width={358}
                      height={358}
                    />
                    {/* <p>{image.name}</p> */}
                    <Image
                      src={CancelIcon}
                      alt="cancel icon"
                      className="absolute -top-[7px] -right-[15px] z-20"
                      onClick={(e) => {
                        setImage(null);
                      }}
                      width={80}
                      height={80}
                    />
                  </div>
                ) : !image ? (
                  <label
                    htmlFor="image"
                    className="w-fit cursor-pointer flex flex-col gap-[8px]">
                    <Image
                      src={uploadImage}
                      alt="image-with-upload-image-text"
                      width={358}
                      height={358}
                      className="rounded-[16px] z-20"
                    />
                    <input
                      className="outline-none border border-solid border-[#D6D9E4] px-[12px] py-[16px] rounded-[8px] sr-only"
                      id="image"
                      type="file"
                      accept="image/jpeg, image/jpg, image/png "
                      onChange={handleImage}
                    />
                    {imageStatus && (
                      <p className="absolute top-[102%] text-[red] text-[14px]">
                        {imageStatus}
                      </p>
                    )}
                  </label>
                ) : (
                  <div className="relative w-fit">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={image.name}
                      className="w-[358px] h-[358px] rounded-[16px] z-20"
                    />
                    <Image
                      src={CancelIcon}
                      alt="cancel icon"
                      className="absolute -top-[7px] -right-[15px] z-20"
                      onClick={(e) => {
                        setImage(null);
                      }}
                      width={80}
                      height={80}
                    />
                  </div>
                )}
              </section>
            </div>
            <div className="absolute flex flex-col pl-[477px]">
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
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    placeholder={userProfile?.first_name || "Enter firstName"}
                    className="mb-[40px] w-[220px] h-12 pl-3 pr-4 py-3 bg-white rounded-lg border border-gray-300 justify-start items-start gap-2 inline-flex"></input>
                  {firstNameError && (
                    <span className="text-red-600">{firstNameError}</span>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="userId"
                    className="pb-[4px] text-black text-[16px] max-md:max-w-full">
                    Lastname
                  </label>
                  <input
                    name="lastname"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    placeholder={userProfile?.last_name || "Enter lastName"}
                    className="mb-[40px] w-[220px] h-12 pl-3 pr-4 py-3 bg-white rounded-lg border border-gray-300 justify-start items-start gap-2 inline-flex"></input>
                  {lastNameError && (
                    <span className="text-red-600">{lastNameError}</span>
                  )}
                </div>
              </div>
              <label
                htmlFor="userId"
                className="pb-[4px] text-black text-[16px] max-md:max-w-full">
                Date of Birth
              </label>
              <input
                name="dateOfBirth"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                type="date"
                placeholder={userProfile?.date_of_birth || "Enter YYYY-MM-DD"}
                className="mb-[40px] w-[453px] h-12 pl-3 pr-4 py-3 bg-white rounded-lg border border-gray-300 justify-start items-start gap-2 inline-flex"></input>
              {dateError && <div className="text-red-600">{dateError}</div>}
              <label
                htmlFor="userId"
                className="pb-[4px] text-black text-[16px] max-md:max-w-full">
                Educational Background
              </label>
              <input
                name="EducationalBackground"
                onChange={(e) => setEducation(e.target.value)}
                value={education}
                type="text"
                placeholder={
                  userProfile?.educational_background ||
                  "Enter educational background"
                }
                className="mb-[40px] w-[453px] h-12 pl-3 pr-4 py-3 bg-white rounded-lg border border-gray-300 justify-start items-start gap-2 inline-flex"></input>
              {EducationalBackgroundError && (
                <p className=" mt-[50px]  text-red-600">
                  {EducationalBackgroundError}
                </p>
              )}
              <label
                htmlFor="userId"
                className="pb-[4px] text-black text-[16px] max-md:max-w-full">
                Email
              </label>
              <input
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={session?.user?.email || "Enter email"}
                className="mb-[40px] w-[453px] h-12 pl-3 pr-4 py-3 bg-white rounded-lg border border-gray-300 justify-start items-start gap-2 inline-flex"></input>
              {emailError && <p className=" text-red-600">{emailError}</p>}
              <button
                onClick={handleUpdateProfile}
                className="mb-[40px] w-[453px] h-[60px] px-8 py-[18px] bg-[#2F5FAC] rounded-xl shadow justify-center items-center gap-2.5 inline-flex text-white">
                Update Profile
              </button>
            </div>
          </div>
        </section>
      </section>

      <Footer />
    </>
  );
}
