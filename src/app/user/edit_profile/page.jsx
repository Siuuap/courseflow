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
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function EditProfileForm() {
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    dateOfBirth: "",
    EducationalBackground: "",
    email: "",
    image: undefined,
  });

  // const getValue = (e) => {
  //   setValues({ ...values, [e.target.name]: e.target.value });
  // };

  const {
    courseName,
    setCourseName,
    price,
    setPrice,
    totalLearningTime,
    setTotalLearningTime,
    courseSummary,
    setCourseSummary,
    courseDetail,
    setCourseDetail,
    coverImages,
    setCoverImages,
    videoTrailer,
    setVideoTrailer,
    lessons,
    attachFile,
    setAttachFile,
    setLessons,
    previewImage,
    setPreviewImage,
    previewVideo,
    setPreviewVideo,
    previewFile,
    setPreviewFile,
  } = useLessonContext();

  function handleCoverImage(e) {
    setCoverImages(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  }

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

    setErrors((prevErrors) => ({
      ...prevErrors,
      ...errors,
    }));

    return errors.dateOfBirth;
  };

  const handleUpdateProfile = (event) => {
    event.preventDefault();

    setErrors({
      firstname: !checkFirstName(values.firstname),
      lastname: !checkLastName(values.lastname),
      dateOfBirthempty: !values.dateOfBirth.trim(),
      dateOfBirth: validateDateOfBirth(values.dateOfBirth),
      EducationalBackground: !values.eb.trim(),
      email: !(values.email.trim() && values.email.includes("@")),
      image: !values.image.trim(),
    });
  };

  const { data: session, status } = useSession();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({});

  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState(userProfile?.first_name);
  const [lastName, setLastName] = useState(userProfile?.last_name);
  const [dateOfBirth, setDateOfBirth] = useState(userProfile?.date_of_birth);
  const [education, setEducation] = useState(
    userProfile?.educational_background
  );
  const [email, setEmail] = useState(userProfile?.email);
  const [image, setImage] = useState(session?.user?.url || "" || null);

  // const [userId, setUserId] = useState("");
  // const [firstName, setFirstName] = useState(null);
  // const [lastName, setLastName] = useState(null);
  // const [dateOfBirth, setDateOfBirth] = useState(null);
  // const [education, setEducation] = useState(null);
  // const [email, setEmail] = useState(null);
  // const [image, setImage] = useState(null);

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

      setFirstName(session?.user?.firstName);
      setLastName(session?.user?.lastName);
      setDateOfBirth(userProfile?.date_of_birth);
      setEducation(userProfile?.educational_background);
      setEmail(session?.user?.email);
      setImage(session?.user?.img_url);
    }
    setLoading(false);
  };

  useEffect(() => {
    getUser();
  }, [status]);

  // const handleInputChange = (event) => {
  //   setFirstName(event.target.value);
  //   setLastName(event.target.value);
  //   setDateOfBirth(event.target.value);
  //   setEducation(event.target.value);
  //   setEmail(event.target.value);
  //   //setImage(event.target.value);
  // };

  // const handleInputChange = (event) => {
  //   setValues({
  //     ...values,
  //     firstname: event.target.value,
  //     lastname: event.target.value,
  //     dateOfBirth: event.target.value,
  //     EducationalBackground: event.target.value,
  //     email: event.target.value,
  //   });
  // };

  const deleteImage = (event) => {
    if (event && event.preventDefault) {
      event.preventDefault();
      const updatedUserProfile = { ...userProfile, img_url: "" };
      setUserProfile(updatedUserProfile);
    } else {
      console.error("Invalid event object:", event);
    }
  };

  const handleFileChange = (event) => {
    const uniqueId = Date.now();
    const file = event.target.files[0];
  };

  return (
    <>
      <NavBar />
      <section className="flex gap-0.5 justify-between items-start px-5 w-full h-[955px] max-md:flex-wrap max-md:mt-10 max-md:max-w-full mx-[auto]">
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
            <div className="relative bg-blue-100 w-[358px] h-[358px] rounded-[16px] flex justify-center items-center">
              <label htmlFor="upload">
                Image
                <input
                  id="upload"
                  name="avatar"
                  type="file"
                  placeholder="Choose image here"
                  multiple
                  hidden
                  accept="image/*"
                  // 1.4
                  onChange={handleFileChange}
                />
              </label>
              <button
                className="absolute left-[320px] top-[10px] w-[32px] h-[32px] rounded-3xl bg-[#9B2FAC] text-white z-10"
                onClick={() => {
                  alert();
                  deleteImage("");
                }}>
                x
              </button>
              {userProfile?.img_url ? (
                <img
                  className="absolute rounded-[16px]"
                  src={userProfile?.img_url}
                  alt="image_profile"
                  width={358}
                  height={358}
                />
              ) : (
                <div>
                  <label
                    htmlFor="coverImage"
                    className="w-fit cursor-pointer flex flex-col gap-[8px]">
                    <Image
                      className="rounded-[16px]"
                      src={uploadImage}
                      alt="image-with-upload"
                      width={358}
                      height={358}
                    />
                    <input
                      className="outline-none border border-solid border-[#D6D9E4] px-[12px] py-[16px] rounded-[8px] sr-only"
                      id="coverImage"
                      type="file"
                      accept="image/jpeg image/jpg image/png"
                      onChange={handleCoverImage}
                    />
                  </label>
                </div>
              )}

              {/* <section className="flex flex-col gap-[8px]">
                {!previewImage ? (
                  <div>
                    <label
                      htmlFor="coverImage"
                      className="w-fit cursor-pointer flex flex-col gap-[8px]">
                      <Image
                        className="rounded-[16px]"
                        src={uploadImage}
                        alt="image-with-upload-image-text"
                        width={358}
                        height={358}
                      />
                      <input
                        className="outline-none border border-solid border-[#D6D9E4] px-[12px] py-[16px] rounded-[8px] sr-only"
                        id="coverImage"
                        type="file"
                        accept="image/jpeg image/jpg image/png"
                        onChange={handleCoverImage}
                      />
                    </label>
                  </div>
                ) : (
                  <div className="relative w-fit z-20">
                    <Image
                      src={image}
                      // src={previewImage}
                      alt={image}
                      className="w-[358px] h-[358px] rounded-lg"
                    />
                    <p>{coverImages.name}</p>
                    <Image
                      src={CancelIcon}
                      alt="cancel icon"
                      className="absolute -top-[7px] -right-[11px]"
                      onClick={(e) => {
                        setCoverImages({});
                        setPreviewImage(null);
                      }}
                    />
                  </div>
                )}
              </section> */}
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
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
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
                    name="lastname"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
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
              <input
                name="dateOfBirth"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                type="date"
                // placeholder={session?.user?.dateofBirth || "Enter DD/MM/YY"}
                placeholder={userProfile?.date_of_birth || "Enter YYYY-MM-DD"}
                className="mb-[40px] w-[453px] h-12 pl-3 pr-4 py-3 bg-white rounded-lg border border-gray-300 justify-start items-start gap-2 inline-flex"></input>
              {errors.dateOfBirthempty && (
                <div className="text-red-600">
                  Please enter your date of birth
                </div>
              )}
              {errors.dateOfBirth && (
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
                onChange={(e) => setEducation(e.target.value)}
                value={education}
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
                //value={userProfile?.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                //placeholder={userProfile?.email || "Enter email"}
                placeholder={session?.user?.email || "Enter email"}
                className="mb-[40px] w-[453px] h-12 pl-3 pr-4 py-3 bg-white rounded-lg border border-gray-300 justify-start items-start gap-2 inline-flex"></input>
              {errors.password && (
                <p className=" text-red-600">กรุณากรอก email</p>
              )}
              <Button
                onClick={handleUpdateProfile}
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
