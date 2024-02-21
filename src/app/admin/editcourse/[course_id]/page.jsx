"use client";
import React, { useState, useRef, useEffect } from "react";
import { supabase } from "@/utils/db";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

import HamburgerMenu from "@/components/HamburgerMenu";
import SideBar from "@/components/SideBar";

import deleteIcon from "@/assets/images/DeleteIcon.svg";
import editIcon from "@/assets/images/EditIcon.svg";
import FileIcon from "@/assets/images/FileIcon.svg";
import DragIcon from "@/assets/images/DragIcon.svg";
import CancelIcon from "@/assets/images/CancelIcon.svg";
import uploadFile from "@/assets/images/uploadFile.svg";
import uploadImage from "@/assets/images/uploadImage.svg";
import uploadVideo from "@/assets/images/uploadVideo.svg";
import playTheVideoIcon from "@/assets/images/playTheVideoIcon.svg";
import arrowBack from "@/assets/images/arrowBack.svg";
import { useLessonContext } from "@/contexts/lessonContext";

import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function EditCourse({ params }) {
  const {
    name,
    setName,
    price,
    setPrice,
    length,
    setLength,
    summary,
    setSummary,
    description,
    setDescription,
    coverImage,
    setCoverImage,
    videoTrailer,
    setVideoTrailer,
    attachedFile,
    setAttachedFile,
    lessons,
    setLessons,
    resetToDefault,
    lessonFromUpdate,
    setLessonFromUpdate,
  } = useLessonContext();
  const [nameStatus, setNameStatus] = useState("");
  const [priceStatus, setPriceStatus] = useState("");
  const [lengthStatus, setLengthStatus] = useState("");
  const [summaryStatus, setSummaryStatus] = useState("");
  const [descriptionStatus, setDescriptionStatus] = useState("");
  const [coverImageStatus, setCoverImageStatus] = useState("");
  const [videoTrailerStatus, setVideoTrailerStatus] = useState("");
  const [deletedLesson, setDeletedLesson] = useState([]);
  const [latestCourseData, setLatestCourseData] = useState("");
  const course_id = params.course_id;
  const router = useRouter();
  console.log(`lessons`, lessons);
  async function getCourseData() {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/courses/${course_id}`
      );
      // console.log(response.data.data[0]);
      setName(response.data.data[0].name);
      setPrice(response.data.data[0].price);
      setLength(response.data.data[0].length);
      setSummary(response.data.data[0].summary);
      setDescription(response.data.data[0].description);
      setCoverImage(response.data.data[0].img_url);
      setVideoTrailer(response.data.data[0].video_url);
      setAttachedFile(response.data.data[0].attached_file_url);
      lessons.length === 0 ? setLessons(response.data.data[0].lessons) : null;
      setLatestCourseData(response.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCourseData();
  }, []);

  const dragLesson = useRef(0);
  const dragOverLesson = useRef(0);

  function handleSortLesson() {
    const lessonsClone = [...lessons];
    const temp = lessonsClone[dragLesson.current];
    lessonsClone[dragLesson.current] = lessonsClone[dragOverLesson.current];
    lessonsClone[dragOverLesson.current] = temp;
    setLessons(lessonsClone);
  }

  async function handleDeleteLessonFromDatabase(index, lesson_id) {
    // const updatedLesson = [...lessons];
    // updatedLesson.splice(index, 1);
    // setLessons(updatedLesson);
    // const id = lesson_id;
    // console.log(`lesson_id`, id);
    // try {
    //   const res = await axios.delete(`http://localhost:3000/api/lessons/${id}`);
    //   console.log(`res from server`, res);
    // } catch (error) {
    //   console.log(`error`, error);
    // }

    const updatedLessons = [...lessons];
    updatedLessons.splice(index, 1);
    setLessons(updatedLessons);

    setDeletedLesson([...deletedLesson, lesson_id]);
  }

  function setStatusToDefault() {
    setNameStatus("");
    setPriceStatus("");
    setLengthStatus("");
    setSummaryStatus("");
    setDescriptionStatus("");
    setCoverImageStatus("");
    setVideoTrailerStatus("");
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

  async function handleSubmmitCourse() {
    const course_id = uuidv4();
    // setStatusToDefault();

    // if (
    //   !name ||
    //   !price ||
    //   !length ||
    //   !summary ||
    //   !description ||
    //   !coverImage ||
    //   !videoTrailer ||
    //   lessons.length === 0
    // ) {
    //   if (!name) {
    //     setNameStatus("Please enter course name");
    //   }
    //   if (!price) {
    //     setPriceStatus("Please enter price");
    //   }
    //   if (!length) {
    //     setLengthStatus("Please enter total learning time");
    //   }
    //   if (!summary) {
    //     setSummaryStatus("Please enter summary");
    //   }

    //   if (!description) {
    //     setDescriptionStatus("Please enter description");
    //   }
    //   if (!coverImage.name) {
    //     setCoverImageStatus("Please upload cover image");
    //   }
    //   if (!videoTrailer.name) {
    //     setVideoTrailerStatus("Please upload video trailer");
    //   }
    //   if (lessons.length === 0) {
    //     alert("Please add at least one lesson");
    //   }
    //   return;
    // }

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
      const response = await axios.post("/api/courses", courseData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    resetToDefault();
    router.push("/admin/courselist");
  }

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

  async function handleSubmit() {
    setStatusToDefault();
    if (
      !name ||
      !price ||
      !length ||
      !summary ||
      !description ||
      !coverImage ||
      !videoTrailer ||
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
      if (!coverImage) {
        setCoverImageStatus("Please upload cover image");
      }
      if (!videoTrailer) {
        setVideoTrailerStatus("Please upload video trailer");
      }
      if (lessons.length === 0) {
        alert("Please add at least one lesson");
      }
      console.log(`check status`);
      return;
    }
    const courseData = {
      course_id: course_id,
      description: description,
      length: length,
      lessons: lessons,
      name: name,
      number_of_lesson: lessons.length,
      price: price,
      summary: summary,
      coverImage: coverImage,
      videoTrailer: videoTrailer,
      attachedFile: attachedFile,
    };
    const lessonData = {
      course_id: course_id,
    };
    const subLessonData = {
      course_id: course_id,
    };

    if (typeof attachedFile === "object" && attachedFile !== null) {
      const fileName = findFilePathNames(latestCourseData.attached_file_url);

      //remove attach file from storage
      try {
        const { data, error } = await supabase.storage
          .from(`courses`)
          .remove(fileName);
        if (error) {
          console.log(`error from supabase`, error);
        }
      } catch (error) {
        console.log(error);
      }

      //upload new file to storage
      try {
        const { data, error } = await supabase.storage
          .from(`courses`)
          .upload(
            `${course_id}/videoTrailer/${coverImage.name}`,
            attachedFile,
            {
              cacheControl: "3600",
              upsert: true,
            }
          );
        if (error) {
          console.log(`error from supabase`, error);
        }
        courseData.attached_file_url = supabase.storage
          .from("courses")
          .getPublicUrl(data.path).data.publicUrl;
      } catch (error) {
        console.log(error);
      }
    }
    console.log(`attached file`, attachedFile);
    if (typeof coverImage === "object") {
      const fileName = findFilePathNames(latestCourseData.img_url);

      //remove old cover image from storage
      try {
        const { data, error } = await supabase.storage
          .from(`courses`)
          .remove(fileName);
        if (error) {
          console.log(`error from supabase`, error);
        }
      } catch (error) {
        console.log(error);
      }

      // upload new cover image to storage
      try {
        const { data, error } = await supabase.storage
          .from(`courses`)
          .upload(`${course_id}/coverImage/${coverImage.name}`, coverImage, {
            cacheControl: "3600",
            upsert: true,
          });
        if (error) {
          console.log(`error from supabase`, error);
        }
        courseData.img_url = supabase.storage
          .from("courses")
          .getPublicUrl(data.path, coverImage).data.publicUrl;
      } catch (error) {
        console.log(error);
      }
    }

    if (typeof videoTrailer === "object") {
      const fileName = findFilePathNames(latestCourseData.videoTrailer);

      // remove old video trailer from storage
      try {
        const { data, error } = await supabase.storage
          .from(`courses`)
          .remove(fileName);
        if (error) {
          console.log(`error from supabase`, error);
        }
      } catch (error) {
        console.log(error);
      }

      //upload new video trailer from storage
      try {
        const { data, error } = await supabase.storage
          .from(`courses`)
          .upload(
            `${course_id}/videoTrailer/${coverImage.name}`,
            videoTrailer,
            {
              cacheControl: "3600",
              upsert: true,
            }
          );
        if (error) {
          console.log(`error`, error);
        }
        console.log(`data`, data);
        courseData.video_url = supabase.storage
          .from("courses")
          .getPublicUrl(data.path).data.publicUrl;
      } catch (error) {
        console.log(error);
      }
    }

    console.log(`courseData before sent to data base`, courseData);

    //send necessary data to the server
    try {
      const response = await axios.put(
        `/api/courses/${courseData.course_id}`,
        courseData
      );
      console.log(response);
    } catch (error) {
      console.log(`error`, error);
    }

    try {
      const response = await axios.delete("/api/lessons", deletedLesson);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    router.push(`/admin/courselist`);
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
              <Link
                href="/admin/courselist"
                onClick={() => {
                  resetToDefault();
                }}
              >
                <button>
                  <Image src={arrowBack} alt="arrow back icon" />
                </button>
              </Link>
              <p className="min-[375px]:text-[20px] font-medium leading-[30px] min-[1440px]:text-[24px] text-[#9AA1B9]">
                Course <span className="text-[#000]">&apos;{name}&apos;</span>
              </p>
              <div className="min-[1440px]:hidden border border-solid border-[#D6D9E4] w-[30px] h-[30px] flex justify-center items-center rounded-md">
                <HamburgerMenu />
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
                onClick={() => {
                  handleSubmit();
                }}
              >
                Edit
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
                type="text"
                placeholder="Course Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
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
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
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
                  type="text"
                  placeholder="Total Learning Time"
                  value={length}
                  onChange={(e) => {
                    setLength(e.target.value);
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
                type="text"
                placeholder="Course Summary"
                value={summary}
                onChange={(e) => {
                  setSummary(e.target.value);
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
                value={description}
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

              {typeof coverImage === "string" ? (
                <div className="relative w-fit">
                  <img
                    src={coverImage}
                    alt={coverImage.name}
                    className="h-[240px] rounded-lg"
                  />
                  <p>{`${name}_cover image`}</p>
                  <Image
                    src={CancelIcon}
                    alt="cancel icon"
                    className="absolute -top-[7px] -right-[11px]"
                    onClick={(e) => {
                      setCoverImage(null);
                    }}
                  />
                </div>
              ) : !coverImage?.name ? (
                <label
                  htmlFor="coverImage"
                  className="w-fit cursor-pointer flex flex-col gap-[8px]"
                >
                  <Image src={uploadImage} alt="image-with-upload-image-text" />
                  <input
                    className="outline-none border border-solid border-[#D6D9E4] px-[12px] py-[16px] rounded-[8px] sr-only"
                    id="coverImage"
                    type="file"
                    accept="image/jpeg, imgae/jpg, image/png "
                    onChange={handleCoverImage}
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
                    className="h-[240px] rounded-lg"
                  />
                  <p>{coverImage.name}</p>
                  <Image
                    src={CancelIcon}
                    alt="cancel icon"
                    className="absolute -top-[7px] -right-[11px]"
                    onClick={(e) => {
                      setCoverImage(null);
                    }}
                  />
                </div>
              )}
            </section>
            <section className="relative flex flex-col gap-[8px]">
              <p> Video Trailer *</p>
              {typeof videoTrailer === "string" ? (
                <div>
                  <div className="w-fit relative ">
                    <video
                      src={videoTrailer}
                      alt={`${name}_trailer`}
                      className="w-[240px] h-[240px] rounded-lg "
                    ></video>

                    <Image
                      src={CancelIcon}
                      alt="cancel icon"
                      className="absolute -top-[7px] -right-[11px]"
                      onClick={(e) => {
                        setVideoTrailer(null);
                      }}
                    />
                    <Image
                      src={playTheVideoIcon}
                      alt="play the video icon"
                      className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]"
                    />
                  </div>
                  <p>{`${name}_trailer`}</p>
                </div>
              ) : !videoTrailer?.name ? (
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
                      handleVideoTrailer(e);
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
                      className="h-[240px] rounded-lg "
                    ></video>

                    <Image
                      src={CancelIcon}
                      alt="cancel icon"
                      className="absolute -top-[7px] -right-[11px]"
                      onClick={(e) => {
                        setVideoTrailer(null);
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
              {typeof attachedFile === "string" ? (
                <div className="relative flex bg-[#E5ECF8] w-[200px] h-[90px] items-center justify-start p-[16px] rounded-lg gap-[30px]">
                  <Image src={FileIcon} alt={attachedFile.name} />
                  <Image
                    src={CancelIcon}
                    alt="cancel icon"
                    className="absolute -top-[7px] -right-[11px]"
                    onClick={(e) => {
                      setAttachedFile(null);
                    }}
                  />
                  <p>file.pdf</p>
                </div>
              ) : !attachedFile?.name ? (
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
                    accept="application/pdf"
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
                      setAttachedFile(null);
                    }}
                  />
                  <p>{attachedFile.name}</p>
                </div>
              )}
            </section>
          </section>
          <section className=" min-[375px]:w-[375px] min-[768px]:w-[768px] min-[1200px]:w-[1200px] min-[1440px]:w-[1120px]">
            <section className="flex justify-between items-center mb-[30px] w-full p-[16px]">
              <p className="text-[24px] ">Lesson</p>
              <Link href={`/admin/editcourse/${course_id}/addlesson`}>
                <button className="bg-[#2F5FAC] min-[375px]:px-[12px] min-[375px]:py-[8px] min-[768px]:px-[32px] min-[768px]:py-[18px] rounded-[12px] text-[#fff] min-[768px]:text-[16px] hover:bg-[#5483D0]">
                  + Add Lesson
                </button>
              </Link>
            </section>
            {/* Lesson Table */}
            {lessons.length === 0 ? null : (
              <section className="hidden min-[768px]:flex bg-[#E4E6ED] rounded-t-lg px-[24px] py-[10px] mx-[16px] min-[1440px]:m-[0px]">
                <section className="hidden min-[768px]:block w-[56px] "></section>
                <section className="hidden min-[768px]:block w-[48px] "></section>
                <section className="hidden min-[768px]:block w-[500px] ">
                  <p>Lesson name</p>
                </section>
                <section className="w-[396px] ">
                  <p>Sub-lesson</p>
                </section>
                <section className="w-[120px] text-center">
                  <p>Action</p>
                </section>
              </section>
            )}

            <section className="flex flex-col gap-[10px] min-[768px]:gap-[0px]">
              {lessons.map(({ name, sub_lessons, lesson_id }, index) => {
                return (
                  <section
                    key={index}
                    className="flex flex-col min-[375px]:mx-auto min-[768px]:mx-[16px] min-[768px]:flex-row min-[375px]:gap-[16px] min-[768px]:gap-[0px] bg-[#fff] min-[375px]:px-[16px] min-[375px]:py-[16px] min-[768px]:px-[28px] min-[768px]:py-[32px] min-[1440px]:m-[0px] min-[375px]:w-[350px] min-[768px]:w-[736px] min-[1200px]:w-[1168px] min-[1440px]:w-[1120px] min-[375px]:rounded-lg min-[768px]:rounded-none relative "
                    draggable="true"
                    onDragStart={() => {
                      dragLesson.current = index;
                      console.log(`Dragtart happens`);
                    }}
                    onDragEnter={() => {
                      dragOverLesson.current = index;
                      console.log(`DragEnter happens`);
                    }}
                    onDragEnd={() => {
                      console.log(`DragEnd happens`);
                      handleSortLesson();
                    }}
                    onDragOver={(e) => {
                      console.log(`DragOver happens`);
                      e.preventDefault();
                    }}
                  >
                    <section className="w-[56px] min-[375px]:hidden min-[768px]:block">
                      <Image
                        src={DragIcon}
                        alt="drag-icon"
                        className="absolute top-0 left-0"
                      />
                    </section>
                    <section className="min-[768px]:w-[48px] flex ">
                      <p className="min-[768px]:hidden basis-[110px]">
                        Lesson No.
                      </p>
                      <p>{index + 1}</p>
                    </section>
                    <section className="min-[768px]:w-[500px] flex">
                      <p className="min-[768px]:hidden basis-[110px]">Name</p>
                      <p>{name}</p>
                    </section>
                    <section className="min-[768px]:w-[396px] flex">
                      <p className="min-[768px]:hidden basis-[110px]">
                        Sub-Lesson
                      </p>
                      <p>{sub_lessons?.length}</p>
                    </section>
                    <section className="min-[768px]:w-[120px] flex justify-center gap-[17px]">
                      <button
                        className="flex justify-center items-center basis-1/2 min-[375px]:bg-[#F1F2F6] min-[768px]:bg-transparent hover:bg-[#C8CCDB] min-[768px]:hover:bg-transparent rounded-lg min-[768px]:p-0"
                        onClick={() => {
                          handleDeleteLessonFromDatabase(index, lesson_id);
                        }}
                      >
                        <Image
                          className="w-[24px] h-[24px]"
                          src={deleteIcon}
                          alt="delete-icon"
                        />
                        <p className="min-[768px]:hidden">Delete</p>
                      </button>
                      <Link
                        href={`/admin/editcourse/${course_id}/editlesson/${lessons[index].lesson_id}`}
                        onClick={() => console.log(index)}
                        className="flex justify-center items-center basis-1/2 min-[375px]:bg-[#F1F2F6] min-[768px]:bg-transparent hover:bg-[#C8CCDB] rounded-lg min-[375px]:p-2 min-[768px]:p-0 min-[768px]:hover:bg-transparent"
                      >
                        <Image
                          className="w-[24px] h-[24px]"
                          src={editIcon}
                          alt="edit-icon"
                        />
                        <p className="min-[768px]:hidden">Edit</p>
                      </Link>
                    </section>
                  </section>
                );
              })}
            </section>
          </section>
        </section>
      </section>
    </section>
  );
}
