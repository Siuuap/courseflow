"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import { supabaseAdmin } from "@/utils/db";

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

export default function AddCourse() {
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

  function handleUploadVideo(e) {
    setVideoTrailer(e.target.files[0]);
    setPreviewVideo(URL.createObjectURL(e.target.files[0]));
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
    const id = uuidv4();
    if (lessons.length === 0) {
      return alert("Please add at least one lesson");
    }
    const courseData = {
      courseName,
      price,
      totalLearningTime,
      courseSummary,
      courseDetail,
      coverImages,
      videoTrailer,
      attachFile,
      lessons,
    };

    try {
      const { data, error } = await supabaseAdmin.storage
        .from("courses")
        .upload(`${courseName}/coverImage/${coverImages.name}`, coverImages);

      courseData.img_url = supabaseAdmin.storage
        .from("courses")
        .getPublicUrl(data.path, coverImages).data.publicUrl;
    } catch (error) {
      console.log(error);
    }

    try {
      const { data, error } = await supabaseAdmin.storage
        .from("courses")
        .upload(`${courseName}/videoTrailer/videotrailer`, videoTrailer);
      courseData.video_url = supabaseAdmin.storage
        .from("courses")
        .getPublicUrl(data.path, coverImages).data.publicUrl;
    } catch (error) {
      console.log(`error`, error);
    }
    getUrlfromSubLesson(courseData.lessons);

    console.log(`courseData`, courseData);
    handleCreateNewCourse(courseData);
  }
  async function getUrlfromSubLesson(lesson) {
    const lessonData = [...lesson];
    for (let i = 0; i < lessonData.length; i++) {
      lessonData[i].lesson_number = i + 1;
      for (let j = 0; j < lessonData[i].subLesson.length; j++) {
        lessonData[i].subLesson[j].subLesson_number = j + 1;
        const video = lessonData[i].subLesson[j].video;
        try {
          const { data, error } = await supabaseAdmin.storage
            .from("courses")
            .upload(
              `${courseName}/lessons/lesson ${i + 1}/sublesson${j + 1}`,
              video
            );
          lessonData[i].subLesson[j].video_url = supabaseAdmin.storage
            .from("courses")
            .getPublicUrl(data.path, video).data.publicUrl;
        } catch (error) {
          console.log(`error`, error);
        }
        setLessons(lessonData);
      }
    }
  }
  async function handleCreateNewCourse(data) {
    let lessons = data.lessons;
    for (let i = 0; i < lessons.length; i++) {
      for (let j = 0; j < lessons[i].subLesson[j].length; j++) {
        delete lessons[i].subLesson[j].video;
      }
    }
    console.log(`lessons`, lessons);
    const courseData = {
      name: data.courseName,
      description: data.courseDetail,
      price: data.price,
      length: data.totalLearningTime,
      summary: data.courseSummary,
      learning_time: data.totalLearningTime,
      img_url: data.img_url,
      video_url: data.video_url,
      attached_file_url: data.attached_file_url,
    };

    // try {
    //   const res = await axios.post("/api/courses", courseData);
    // } catch (error) {
    //   console.log(error);
    // }
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
            <div className="flex">
              <p className="min-[375px]:text-[20px] font-medium leading-[30px] min-[1440px]:text-[24px]">
                Add Course
              </p>
              <button className="min-[1440px]:hidden">💩</button>
            </div>

            <div className="flex gap-[10px] ">
              <Link href="/admin/courselist">
                <button className="bg-[#fff] border border-solid border-[#F47E20] min-[0px]:px-[12px] min-[0px]:py-[8px] min-[768px]:px-[32px] min-[768px]:py-[18px] rounded-[12px] text-[#F47E20] min-[768px]:text-[16px] hover:border-[#FBAA1C] hover:text-[#FBAA1C]">
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
            <section className="flex flex-col gap-[4px]">
              <label htmlFor="name">Course Name *</label>
              <input
                className="outline-none border border-solid border-[#D6D9E4] px-[12px] py-[16px] rounded-[8px]"
                id="name"
                type="text"
                placeholder="Course Name"
                value={courseName}
                onChange={(e) => {
                  setCourseName(e.target.value);
                }}
              />
            </section>
            <section className="flex gap-[40px] min-[375px]:flex-col min-[768px]:flex-row">
              <section className="flex flex-col gap-[4px] basis-1/2">
                <label htmlFor="price">Price *</label>
                <input
                  className="outline-none border border-solid border-[#D6D9E4] px-[12px] py-[16px] rounded-[8px]"
                  id="price"
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </section>
              <section className="flex flex-col gap-[4px] basis-1/2">
                <label htmlFor="price">Total Learning Time *</label>
                <input
                  className="outline-none border border-solid border-[#D6D9E4] px-[12px] py-[16px] rounded-[8px]"
                  id="length"
                  type="text"
                  placeholder="Total Learning Time"
                  value={totalLearningTime}
                  onChange={(e) => {
                    setTotalLearningTime(e.target.value);
                  }}
                />
              </section>
            </section>
            <section className="flex flex-col gap-[4px]">
              <label htmlFor="summary">Course Summary *</label>
              <input
                className="outline-none border border-solid border-[#D6D9E4] px-[12px] py-[16px] rounded-[8px]"
                id="summary"
                type="text"
                placeholder="Course Summary"
                value={courseSummary}
                onChange={(e) => {
                  setCourseSummary(e.target.value);
                }}
              />
            </section>
            <section className="flex flex-col gap-[4px]">
              <label htmlFor="description">Course Detail *</label>
              <input
                className="outline-none border border-solid border-[#D6D9E4] px-[12px] py-[16px] rounded-[8px]"
                id="description"
                type="text"
                placeholder="Course Detail"
                value={courseDetail}
                onChange={(e) => {
                  setCourseDetail(e.target.value);
                }}
              />
            </section>

            <section className="flex flex-col gap-[8px]">
              <p>Course Image *</p>
              {!previewImage ? (
                <label
                  htmlFor="coverImage"
                  className="w-fit cursor-pointer flex flex-col gap-[8px]"
                >
                  <Image src={uploadImage} alt="image-with-upload-image-text" />
                  <input
                    className="outline-none border border-solid border-[#D6D9E4] px-[12px] py-[16px] rounded-[8px] sr-only"
                    id="coverImage"
                    type="file"
                    accept="image/jpeg imgae/jpg image/png video/*"
                    onChange={handleCoverImage}
                  />
                </label>
              ) : (
                <div className="relative w-fit">
                  <img
                    src={previewImage}
                    alt={coverImages.name}
                    className="w-[240px] h-[240px] rounded-lg"
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
            </section>
            <section className="flex flex-col gap-[8px]">
              <p> Video Trailer *</p>
              {!previewVideo ? (
                <label
                  htmlFor="videoTrailer"
                  className="w-fit cursor-pointer flex flex-col gap-[8px]"
                >
                  <Image src={uploadVideo} alt="image-with-upload-image-text" />
                  <input
                    className="outline-none border border-solid border-[#D6D9E4] px-[12px] py-[16px] rounded-[8px] sr-only"
                    id="videoTrailer"
                    type="file"
                    onChange={(e) => {
                      handleUploadVideo(e);
                    }}
                  />
                </label>
              ) : (
                <div>
                  <div className="w-fit relative ">
                    <video
                      src={previewVideo}
                      alt={videoTrailer.name}
                      className="w-[240px] h-[240px] rounded-lg "
                    ></video>

                    <Image
                      src={CancelIcon}
                      alt="cancel icon"
                      className="absolute -top-[7px] -right-[11px]"
                      onClick={(e) => {
                        setVideoTrailer({});
                        setPreviewVideo(null);
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
              <label
                htmlFor="attachFile"
                className="w-fit cursor-pointer flex flex-col gap-[8px]"
              >
                Attach File (Optional)
                <input
                  id="attachFile"
                  className="outline-none border border-solid border-[#D6D9E4] px-[12px] py-[16px] rounded-[8px] "
                  type="file"
                />
                <Image src={uploadFile} alt="image-with-upload-file-text" />
              </label>
            </section>
          </section>
          <LessonBox />
        </section>
      </section>
    </section>
  );
}
