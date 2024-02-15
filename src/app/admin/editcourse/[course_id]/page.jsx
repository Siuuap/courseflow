"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/utils/db";

import SideBar from "@/components/SideBar";
import CancelIcon from "@/assets/images/CancelIcon.svg";
import uploadFile from "@/assets/images/uploadFile.svg";
import uploadImage from "@/assets/images/uploadImage.svg";
import uploadVideo from "@/assets/images/uploadVideo.svg";
import playTheVideoIcon from "@/assets/images/playTheVideoIcon.svg";
import Image from "next/image";
import LessonBox from "@/components/LessonBox";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useLessonContext } from "@/contexts/lessonContext";
import { useSession, signOut } from "next-auth/react";
import FileIcon from "@/assets/images/FileIcon.svg";
import HamburgerMenu from "@/components/HamburgerMenu";
import { useRouter } from "next/navigation";
import arrowBack from "@/assets/images/arrowBack.svg";

export default function AddCourse({ params }) {
  // const [course, setCourse] = useState({
  //   attached_file_url: "",
  //   course_id: "",
  //   created_at: "",
  //   description: "",
  //   img_url: "",
  //   length: "",
  //   lessons: [],
  //   name: "",
  //   number_of_lesson: "",
  //   price: "",
  //   summary: "",
  //   updated_at: "",
  //   video_url: "",
  //   coverImage: {},
  //   videoTrailer: {},
  //   attachedFile: {},
  // });
  const [course, setCourse] = useState({});
  const [coverImage, setCoverImage] = useState({});
  const [attachedFile, setAttachedFile] = useState({});
  const [videoTrailer, setVideoTrailer] = useState({});
  const id = params.course_id;
  async function getCourseById() {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/courses/${id}`
      );
      setCourse(response.data.data[0]);
    } catch (error) {
      console.log(`error when request`, error);
    }
  }
  console.log(course);
  useEffect(() => {
    getCourseById();
  }, []);

  const [nameStatus, setNameStatus] = useState("");
  const [priceStatus, setPriceStatus] = useState("");
  const [lengthStatus, setLengthStatus] = useState("");
  const [summaryStatus, setSummaryStatus] = useState("");
  const [descriptionStatus, setDescriptionStatus] = useState("");
  const [coverImageStatus, setCoverImageStatus] = useState("");
  const [videoTrailerStatus, setVideoTrailerStatus] = useState("");

  const router = useRouter();
  function setStatusToDefault() {
    setNameStatus("");
    setPriceStatus("");
    setLengthStatus("");
    setSummaryStatus("");
    setDescriptionStatus("");
    setCoverImageStatus("");
    setVideoTrailerStatus("");
  }

  function handleUpdateField(e) {
    const { files, name, value } = e.target;
    setCourse({ ...course, [name]: value });
  }

  function handleCoverImage(e) {
    if (e.target.files[0].size > 5000000) {
      setCoverImageStatus("File size should be less than 5MB");
      return;
    }
    setCoverImage(e.target.files[0]);
  }

  function handleVideoTrailer(e) {
    if (e.target.files[0].size > 20000000) {
      setVideoTrailerStatus("File size should be less than 20MB");
      return;
    }
    setVideoTrailer(e.target.files[0]);
  }
  function handleAttachedFile(e) {
    setAttachedFile(e.target.files[0]);
  }
  async function createNewCourse(formData) {
    const data = formData;
    try {
      const response = await axios.post("/api/courses", data);
      console.log(response);
    } catch (error) {
      console.log(`error from add new course request`, error);
    }
  }

  async function handleSubmmitCourse() {
    setStatusToDefault();
    const course_id = uuidv4();

    if (
      !name ||
      !price ||
      !length ||
      !summary ||
      !description ||
      !coverImage.name ||
      !videoTrailer.name ||
      lessons.length === 0
    ) {
      if (!name) {
        setNameStatus("Please enter course name");
      }
      if (!price) {
        setPriceStatus("Please enter price");
      }
      if (!length) {
        setLengthStatus("Please enter total learning time");
      }
      if (!summary) {
        setSummaryStatus("Please enter summary");
      }

      if (!description) {
        setDescriptionStatus("Please enter description");
      }
      if (!coverImage.name) {
        setCoverImageStatus("Please upload cover image");
      }
      if (!videoTrailer.name) {
        setVideoTrailerStatus("Please upload video trailer");
      }
      if (lessons.length === 0) {
        alert("Please add at least one lesson");
      }
      return;
    }

    const courseData = {
      course_id: course_id,
      name,
      price,
      length,
      summary,
      description,
      coverImage,
      videoTrailer,
      attachedFile,
      lessons,
    };

    //upload cover image
    try {
      const { data, error } = await supabase.storage
        .from("courses")
        .upload(`${course_id}/coverImage/${coverImage.name}`, coverImage, {
          cacheControl: "3600",
          upsert: false,
        });

      courseData.img_url = supabase.storage
        .from("courses")
        .getPublicUrl(data.path, coverImage).data.publicUrl;
    } catch (error) {
      console.log(error);
    }

    //upload video trailer
    try {
      const { data, error } = await supabase.storage
        .from("courses")
        .upload(`${course_id}/videoTrailer/videotrailer`, videoTrailer, {
          cacheControl: "3600",
          upsert: false,
        });
      courseData.video_url = supabase.storage
        .from("courses")
        .getPublicUrl(data.path, videoTrailer).data.publicUrl;
    } catch (error) {
      console.log(`error`, error);
    }

    //upload file
    if (attachedFile.name) {
      try {
        const { data, error } = await supabase.storage
          .from("courses")
          .upload(`${course_id}/file/file`, attachedFile, {
            cacheControl: "3600",
            upsert: false,
          });
        courseData.attached_file_url = supabase.storage
          .from("courses")
          .getPublicUrl(data.path, attachedFile).data.publicUrl;
      } catch (error) {
        console.log(`error`, error);
      }
    } else {
      courseData.attached_file_url = null;
    }

    // Generate lesson_id and sub_lesson_id
    for (let i = 0; i < lessons.length; i++) {
      const lesson_id = uuidv4();
      courseData.lessons[i].lesson_id = lesson_id;
      courseData.lessons[i].lesson_number = i + 1;
    }

    for (let i = 0; i < courseData.lessons.length; i++) {
      for (let j = 0; j < courseData.lessons[i].subLesson.length; j++) {
        const sub_lesson_id = uuidv4();
        courseData.lessons[i].subLesson[j].sub_lesson_id = sub_lesson_id;
        courseData.lessons[i].subLesson[j].sub_lesson_number = j + 1;
      }
    }

    for (let i = 0; i < courseData.lessons.length; i++) {
      for (let j = 0; j < courseData.lessons[i].subLesson.length; j++) {
        const video = courseData.lessons[i].subLesson[j].video;
        try {
          const { data, error } = await supabase.storage
            .from("courses")
            .upload(
              `${courseData.course_id}/lessons/${courseData.lessons[i].lesson_id}/sub_lessons/${courseData.lessons[i].subLesson[j].sub_lesson_id}/sublesson${courseData.lessons[i].subLesson[j].sub_lesson_number}`,
              video,
              {
                cacheControl: "3600",
                upsert: false,
              }
            );
          courseData.lessons[i].subLesson[j].video_url = supabase.storage
            .from("courses")
            .getPublicUrl(data.path, video).data.publicUrl;
          delete courseData.lessons[i].subLesson[j].video;
        } catch (error) {
          console.log(`error`, error);
        }
      }
    }

    // getUrlfromSubLesson(courseData);
    handleCreateNewCourse(courseData);
  }

  async function handleCreateNewCourse(data) {
    const courseData = {
      course_id: data.course_id,
      name: data.name,
      description: data.description,
      price: data.price,
      length: data.length,
      summary: data.summary,
      img_url: data.img_url,
      video_url: data.video_url,
      attached_file_url: data.attached_file_url,
      lessons: data.lessons,
    };
    console.log(`courseData before post`, courseData);
    try {
      const res = await axios.post("/api/courses", courseData);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    resetToDefault();
    router.push("/admin/courselist");
  }

  return (
    <section className="flex justify-center mx-auto relative min-[1440px]:w-[1440px]">
      <div className="min-[0px]:hidden min-[1440px]:block ">
        {/* Box1 SideBar*/}
        <SideBar />
      </div>

      <section className="bg-[#F6F7FC] flex flex-col mx-auto min-[1440px]:ml-[240px]">
        {/* Box2 upper*/}
        <section className="border border-solid border-[#F6F7FC] bg-white flex min-[0px]:flex-col justify-between items-center rounded-lg min-[0px]:w-[375px] min-[0px]:p-[16px]  min-[768px]:w-[768px] min-[1200px]:w-[1200px] min-[1440px]:w-[1200px] min-[1440px]:justify-between min-[1440px]:px-[40px] min-[1440px]:py-[16px] mx-auto fixed gap-[10px] min-[768px]:gap-[0px] z-10">
          <div className="flex w-full items-center justify-between">
            <div className="flex gap-[8px] items-center">
              <Link href="/admin/courselist">
                <Image src={arrowBack} alt="arrow back icon" />
              </Link>
              <p className="min-[375px]:text-[20px] font-medium leading-[30px] min-[1440px]:text-[24px] text-[#9AA1B9]">
                Course <span className="text-[#000]">'{course.name}'</span>
              </p>
              <div className="min-[1440px]:hidden border border-solid border-[#D6D9E4] w-[30px] h-[30px] flex justify-center items-center rounded-md">
                <HamburgerMenu className="p-[20px]" />
              </div>
            </div>

            <div className="flex gap-[10px] ">
              <Link href="/admin/courselist">
                <button
                  className="bg-[#fff] border border-solid border-[#F47E20] min-[0px]:px-[12px] min-[0px]:py-[8px] min-[768px]:px-[32px] min-[768px]:py-[18px] rounded-[12px] text-[#F47E20] min-[768px]:text-[16px] hover:border-[#FBAA1C] hover:text-[#FBAA1C]"
                  onClick={() => resetToDefault()}
                >
                  Cancel
                </button>
              </Link>

              <button
                className="bg-[#2F5FAC] min-[0px]:px-[12px] min-[0px]:py-[8px] min-[768px]:px-[32px] min-[768px]:py-[18px] rounded-[12px] text-[#fff] min-[768px]:text-[16px] hover:bg-[#5483D0]"
                onClick={handleSubmmitCourse}
              >
                Create
              </button>
            </div>
          </div>
        </section>

        {/* Box2 Courselist Box*/}
        {/* Contaner (outer gray box) */}
        <section className="mx-auto min-[375px]:mt-[80px] min-[1440px]:mt-[120px] m-[40px] flex flex-col items-center justify-center gap-[30px] min-[1440px]:w-[1200px] bg-[#F6F7FC] rounded-lg w-full ">
          {/* Content (inner box) */}
          <section className="flex flex-col gap-[40px] min-[375px]:w-[350px] min-[768px]:w-[743px] border border-solid border-[#F6F7FC] rounded-lg bg-white min-[1200px]:w-[1200px] min-[1440px]:w-[1120px] p-[40px] min-[1440px]:px-[100px]">
            <section className="relative flex flex-col gap-[4px]">
              <label htmlFor="name">Course Name *</label>
              <input
                className={`${
                  nameStatus ? `border-[red]` : `border-[#D6D9E4]`
                } outline-none border border-solid px-[12px] py-[16px] rounded-[8px]`}
                id="name"
                name="name"
                type="text"
                placeholder="Course Name"
                value={course?.name}
                onChange={(e) => {
                  handleUpdateField(e);
                }}
              />
              {nameStatus && (
                <p className="absolute text-[red] top-[105%] text-[14px]">
                  {nameStatus}
                </p>
              )}
            </section>
            <section className="flex gap-[40px] min-[375px]:flex-col min-[768px]:flex-row">
              <section className="relative flex flex-col gap-[4px] basis-1/2">
                <label htmlFor="price">Price *</label>
                <input
                  className={`${
                    priceStatus ? `border-[red]` : `border-[#D6D9E4]`
                  } outline-none border border-solid px-[12px] py-[16px] rounded-[8px]`}
                  id="price"
                  name="price"
                  type="number"
                  placeholder="Price"
                  value={course?.price}
                  onChange={(e) => {
                    handleUpdateField(e);
                  }}
                />
                {priceStatus && (
                  <p className="absolute text-[red] top-[105%] text-[14px]">
                    {priceStatus}
                  </p>
                )}
              </section>
              <section className="relative flex flex-col gap-[4px] basis-1/2">
                <label htmlFor="length">Total Learning Time *</label>
                <input
                  className={`${
                    lengthStatus ? `border-[red]` : `border-[#D6D9E4]`
                  } outline-none border border-solid px-[12px] py-[16px] rounded-[8px]`}
                  id="length"
                  name="length"
                  type="text"
                  placeholder="Total Learning Time"
                  value={course?.length}
                  onChange={(e) => {
                    handleUpdateField(e);
                  }}
                />
                {lengthStatus && (
                  <p className="absolute text-[red] top-[105%] text-[14px]">
                    {lengthStatus}
                  </p>
                )}
              </section>
            </section>
            <section className="relative flex flex-col gap-[4px]">
              <label htmlFor="summary">Course Summary *</label>
              <input
                className={`${
                  summaryStatus ? `border-[red]` : `border-[#D6D9E4]`
                } outline-none border border-solid px-[12px] py-[16px] rounded-[8px]`}
                id="summary"
                name="summary"
                type="text"
                placeholder="Course Summary"
                value={course?.summary}
                onChange={(e) => {
                  handleUpdateField(e);
                }}
              />
              {summaryStatus && (
                <p className="absolute text-[red] top-[105%] text-[14px]">
                  {summaryStatus}
                </p>
              )}
            </section>
            <section className="relative flex flex-col gap-[4px]">
              <label htmlFor="description">Course Detail *</label>
              <textarea
                className={`${
                  descriptionStatus ? `border-[red]` : `border-[#D6D9E4]`
                } outline-none border border-solid border-[#D6D9E4] px-[12px] py-[16px] rounded-[8px] h-[192px] resize-none overflow-y-auto`}
                id="description"
                type="text"
                placeholder="Course Detail"
                value={course?.description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></textarea>
              {descriptionStatus && (
                <p className="absolute text-[red] top-[105%] text-[14px]">
                  {descriptionStatus}
                </p>
              )}
            </section>

            <section className={`relative flex flex-col gap-[8px] `}>
              <p>Course Image *</p>

              {!coverImage.name ? (
                <label
                  htmlFor="coverImage"
                  className="w-fit cursor-pointer flex flex-col gap-[8px]"
                >
                  <Image src={uploadImage} alt="image-with-upload-image-text" />
                  <input
                    className="outline-none border border-solid border-[#D6D9E4] px-[12px] py-[16px] rounded-[8px] sr-only"
                    id="coverImage"
                    name="img_url"
                    type="file"
                    accept="image/jpeg, imgae/jpg, image/png "
                    onChange={(e) => {
                      handleUpdateField(e);
                    }}
                  />
                  {coverImageStatus && (
                    <p className="absolute top-[102%] text-[red] text-[14px]">
                      {coverImageStatus}
                    </p>
                  )}
                </label>
              ) : (
                <div className="relative w-fit">
                  <img
                    src={URL.createObjectURL(coverImage)}
                    alt={coverImage.name}
                    className="w-[240px] h-[240px] rounded-lg"
                  />
                  <p>{coverImage.name}</p>
                  <Image
                    src={CancelIcon}
                    alt="cancel icon"
                    className="absolute -top-[7px] -right-[11px]"
                    onClick={(e) => {
                      setCoverImage({});
                    }}
                  />
                </div>
              )}
            </section>
            <section className="relative flex flex-col gap-[8px]">
              <p> Video Trailer *</p>
              {!videoTrailer.name ? (
                <label
                  htmlFor="videoTrailer"
                  className="w-fit cursor-pointer flex flex-col gap-[8px]"
                >
                  <Image src={uploadVideo} alt="image-with-upload-image-text" />
                  <input
                    className="outline-none border border-solid border-[#D6D9E4] px-[12px] py-[16px] rounded-[8px] sr-only"
                    id="videoTrailer"
                    type="file"
                    accept="video/mp4,video/mov,video/avi"
                    onChange={(e) => {
                      handleUpdateField(e);
                    }}
                  />
                  {videoTrailerStatus && (
                    <p className="absolute top-[102%] text-[red] text-[14px]">
                      {videoTrailerStatus}
                    </p>
                  )}
                </label>
              ) : (
                <div>
                  <div className="w-fit relative ">
                    <video
                      src={URL.createObjectURL(videoTrailer)}
                      alt={videoTrailer.name}
                      className="w-[240px] h-[240px] rounded-lg "
                    ></video>

                    <Image
                      src={CancelIcon}
                      alt="cancel icon"
                      className="absolute -top-[7px] -right-[11px]"
                      onClick={(e) => {
                        setVideoTrailer({});
                      }}
                    />
                    <Image
                      src={playTheVideoIcon}
                      alt="play the video icon"
                      className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]"
                    />
                  </div>
                  <p>{videoTrailer.name}</p>
                </div>
              )}
            </section>
            <section className="flex flex-col gap-[8px]">
              <p>Attach File (Optional)</p>
              {!attachedFile.name ? (
                <label
                  htmlFor="attachFile"
                  className="w-fit cursor-pointer flex flex-col gap-[8px]"
                >
                  <input
                    id="attachFile"
                    className="outline-none min-[375px]:w-[200px] border border-solid border-[#D6D9E4] px-[12px] py-[16px] rounded-[8px] sr-only"
                    type="file"
                    onChange={(e) => {
                      handleAttachedFile(e);
                    }}
                  />
                  <Image src={uploadFile} alt="image-with-upload-file-text" />
                </label>
              ) : (
                <div className="relative flex bg-[#E5ECF8] w-[200px] h-[90px] items-center justify-start p-[16px] rounded-lg gap-[30px]">
                  <Image src={FileIcon} alt={attachedFile.name} />
                  <Image
                    src={CancelIcon}
                    alt="cancel icon"
                    className="absolute -top-[7px] -right-[11px]"
                    onClick={(e) => {
                      setAttachedFile({});
                    }}
                  />
                  <p>{attachedFile.name}</p>
                </div>
              )}
            </section>
          </section>
          <LessonBox course={course} />
        </section>
      </section>
    </section>
  );
}
