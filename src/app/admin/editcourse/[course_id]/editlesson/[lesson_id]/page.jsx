"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/utils/db";

import SideBar from "@/components/SideBar";
import uploadFile from "@/assets/images/uploadFile.svg";
import uploadImage from "@/assets/images/uploadImage.svg";
import uploadVideo from "@/assets/images/uploadVideo.svg";
import Image from "next/image";
import arrowBack from "@/assets/images/arrowBack.svg";
import uploadVideoSubLesson from "@/assets/images/uploadVideoSubLesson.svg";
import DragIcon from "@/assets/images/DragIcon.svg";
import { useLessonContext } from "@/contexts/lessonContext";
import { useRouter } from "next/navigation";
import CancelIcon from "@/assets/images/CancelIcon.svg";
import axios from "axios";
import HamburgerMenu from "@/components/HamburgerMenu";
import { v4 as uuidv4 } from "uuid";
import cloneDeep from "lodash/cloneDeep";
export default function EditLessonWhenAdd({ params }) {
  const router = useRouter();
  const course_id = params.course_id;
  const lesson_id = params.lesson_id;

  const { name, lessons, setLessons, backupLessons } = useLessonContext();

  const backupLesson = lessons.filter((lesson) => {
    return lesson.lesson_id === lesson_id;
  });

  const lesson = cloneDeep(backupLesson);
  const [lessonName, setLessonName] = useState(lesson[0]?.name);
  const [subLesson, setSubLesson] = useState(lesson[0]?.sub_lessons);
  const [lessonNameStatus, setLessonNameStatus] = useState("");

  const [courseName, setCourseName] = useState("");

  function handleAddSubLesson() {
    setSubLesson([
      ...subLesson,
      {
        course_id: course_id,
        sublesson_id: uuidv4(),
        name: "",
        video_url: null,
      },
    ]);
  }

  function handleDeleteSubLesson(e, index) {
    if (subLesson.length === 1) {
      return;
    }
    const newSubLesson = [...subLesson];
    newSubLesson.splice(index, 1);
    setSubLesson(newSubLesson);
  }

  function handleDeleteSubLessonVideo(e, index) {
    const newSubLesson = [...subLesson];
    newSubLesson[index].video = null;
    setSubLesson(newSubLesson);
  }
  function handleUpdateSubLessonName(e, index) {
    const { name, value } = e.target;
    const subLessonList = [...subLesson];

    subLessonList[index][name] = value;
    setSubLesson(subLessonList);
  }

  function handleUpdateSubLessonVideo(e, index) {
    const { name, files } = e.target;
    if (files.size > 20000000) {
      return;
    }
    const subLessonList = [...subLesson];
    subLessonList[index][name] = files[0];
    setSubLesson(subLessonList);
  }

  function handleUpdateLesson(e, index) {
    setLessonNameStatus("");
    if (!lessonName) {
      setLessonNameStatus("Lesson Name is required");
      return;
    }
    for (let i = 0; i < subLesson.length; i++) {
      if (!subLesson[i].subLessonName || !subLesson[i].video) {
        return;
      }
    }

    const newLesson = [...lessons];
    const data = {
      lesson: lesson,
      subLesson: subLesson,
    };
    newLesson.splice(index, 0, data);
    setLessons(newLesson);
    router.push(`/admin/editcourse/${lesson.course_id}`);
  }

  function cancleEditLesson() {
    router.push(`/admin/editcourse/${course_id}`);
  }

  return (
    <section className="flex justify-center mx-auto relative min-[1440px]:w-[1440px]">
      <div className="min-[0px]:hidden min-[1440px]:block ">
        {/* Box1 SideBar*/}
        <SideBar />
      </div>

      <section className="bg-[#F6F7FC] flex flex-col mx-auto min-[1440px]:ml-[240px]">
        {/* Box2 upper*/}
        <section className="border border-solid border-[#F6F7FC] bg-white flex min-[0px]:flex-col justify-between items-center rounded-lg min-[0px]:w-[375px] min-[0px]:p-[16px] min-[768px]:w-[768px] min-[1200px]:w-[1200px] min-[1440px]:w-[1200px] min-[1440px]:justify-between min-[1440px]:px-[40px] min-[1440px]:py-[16px] mx-auto fixed gap-[10px] min-[768px]:gap-[0px] z-[2]">
          <div className="flex w-full items-center justify-between ">
            <div className="flex items-center gap-[16px]">
              <Link href={`/admin/editcourse/${course_id}`}>
                <button>
                  <Image src={arrowBack} alt="arrow back icon" />
                </button>
              </Link>
              <div>
                <p className="min-[375px]:text-[14px] font-medium leading-[30px]  text-[#9AA1B9]">
                  Course{" "}
                  <span className="text-[#000]">
                    &apos;{courseName}&apos; &apos;{lessonName}
                    &apos;
                  </span>
                </p>
                <div className="flex">
                  <p className="min-[375px]:text-[20px] font-medium leading-[30px] min-[1440px]:text-[24px]">
                    Edit Lesson
                  </p>
                  <div className="min-[1440px]:hidden border border-solid border-[#D6D9E4] w-[30px] h-[30px] flex justify-center items-center rounded-md">
                    <HamburgerMenu />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-[10px] ">
              <Link href={`/admin/editcourse/${course_id}`}>
                <button className="bg-[#fff] border border-solid border-[#F47E20] min-[0px]:px-[12px] min-[0px]:py-[8px] min-[768px]:px-[32px] min-[768px]:py-[18px] rounded-[12px] text-[#F47E20] min-[768px]:text-[16px] hover:border-[#FBAA1C] hover:text-[#FBAA1C]">
                  Cancel
                </button>
              </Link>
              <button
                className="bg-[#2F5FAC] min-[0px]:px-[12px] min-[0px]:py-[8px] min-[768px]:px-[32px] min-[768px]:py-[18px] rounded-[12px] text-[#fff] min-[768px]:text-[16px] hover:bg-[#5483D0]"
                onClick={() => {
                  handleUpdateLesson();
                }}
              >
                Edit
              </button>
            </div>
          </div>
        </section>

        {/* Box2 Courselist Box*/}
        {/* Contaner (outer gray box) */}
        <section className="gray-box mx-auto min-[0px]:mt-[130px] min-[768px]:mt-[120px] m-[40px] flex flex-col items-center gap-[40px] min-[1440px]:w-[1200px] rounded-lg ">
          {/* Content (inner box) don't forget to check display block*/}
          <section className="min-[375px]:flex min-[375px]:flex-col min-[375px]:w-[343px] min-[768px]:w-[736px] border border-solid border-[#F6F7FC] bg-white rounded-lg min-[0px]:hidden min-[1200px]:w-[1168px] min-[1440px]:w-[1120px] gap-[40px] min-[375px]:px-[16px] min-[375px]:py-[16px] min-[768px]:px-[100px] min-[768px]:py-[40px] min-[375px]:mx-[16px]">
            <div className="relative flex flex-col gap-[4px] z-[0]">
              <label htmlFor="lessonName">Lesson Name *</label>
              <input
                id="lessonName"
                name="name"
                className={`${
                  !lessonName ? `border-[red]` : `border-[#D6D9E4]`
                } outline-none border border-solid border-[#D6D9E4] px-[12px] py-[16px] rounded-[8px]`}
                type="text"
                placeholder="Lesson Name"
                value={lessonName}
                onChange={(e) => setLessonName(e.target.value)}
              />

              {!lessonName && (
                <p className="absolute text-[red] top-[105%] text-[12px]">
                  Lesson name is reqiured
                </p>
              )}
            </div>
            <div className="bg-[#D6D9E4] h-[1px]"></div>
            <div>
              <label
                htmlFor="lessonName"
                className="text-[20px] text-[#646D89] leading-[30px] font-[600]"
              >
                Sub-Lesson
              </label>
            </div>
            <section className="flex flex-col gap-[24px]">
              {subLesson?.map(({ name, video, video_url }, index) => {
                return (
                  <section
                    key={index}
                    className="flex min-[375px]:gap-[7px] min-[768px]:gap-[24px] justify-between bg-[#F6F7FC] rounded-lg min-[0px]:p-[16px] min-[768px]:px-[16px] min-[768px]:py-[24px] "
                  >
                    <div className="min-[768px]:block">
                      <Image src={DragIcon} alt="drag icon" />
                    </div>
                    <div className=" flex flex-col gap-[24px] basis-full">
                      <div className="relative flex flex-col gap-[4px]">
                        <label htmlFor={name}>Sub-lesson Name *</label>
                        <input
                          name="name"
                          id={name}
                          className={`${
                            name ? `border-[#D6D9E4]` : `border-[red]`
                          } min-[375px]:w-full min-[1200px]:w-[80%] outline-none border border-solid  px-[12px] py-[16px] rounded-[8px]`}
                          type="text"
                          placeholder="Lesson Name"
                          value={name}
                          onChange={(e) => {
                            handleUpdateSubLessonName(e, index);
                          }}
                        />
                        {name ? null : (
                          <p className="absolute text-[red] text-[12px] top-[100%]">
                            Sub-lesson name is required.
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col gap-[8px]">
                        <p>Video *</p>
                        {video_url ? (
                          <div className="relative w-fit">
                            <video
                              src={video_url}
                              className="relative w-[400px]"
                              accept="video/mov, video/mp4, video/avi"
                            ></video>
                            <Image
                              src={CancelIcon}
                              alt="cancel icon"
                              className="absolute top-[0%] right-[0] "
                              onClick={(e) => {
                                handleDeleteSubLessonVideo(e, index);
                              }}
                            />
                          </div>
                        ) : !video?.name ? (
                          <label
                            htmlFor={`video${index}`}
                            className="w-fit cursor-pointer flex flex-col gap-[8px] relative"
                          >
                            <input
                              name="video_url"
                              id={`video${index}`}
                              className="min-[375px]:w-[200px] outline-none border border-solid border-[#D6D9E4] px-[12px] py-[16px] rounded-[8px] sr-only"
                              type="file"
                              placeholder="Lesson Name"
                              value={video}
                              onChange={(e) => {
                                handleUpdateSubLessonVideo(e, index);
                              }}
                              accept="video/mov, video/mp4, video/avi"
                            />
                            <Image
                              src={uploadVideoSubLesson}
                              alt="upload sub lesson video inage"
                            />
                            {video || video_url ? null : (
                              <p className="absolute text-[12px] text-[red] top-[100%]">
                                Press enter the video
                              </p>
                            )}
                          </label>
                        ) : (
                          <div className="relative w-fit">
                            <video
                              src={URL.createObjectURL(video)}
                              className="relative w-[400px]"
                              accept="video/mov, video/mp4, video/avi"
                            ></video>
                            <Image
                              src={CancelIcon}
                              alt="cancel icon"
                              className="absolute top-[0%] right-[0] "
                              onClick={(e) => {
                                handleDeleteSubLessonVideo(e, index);
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <button
                        className={`font-[700] ${
                          subLesson.length === 1
                            ? `text-[#C8CCDB] cursor-not-allowed`
                            : `text-[#2F5FAC]`
                        }`}
                        onClick={(e) => handleDeleteSubLesson(e, index)}
                      >
                        Delete
                      </button>
                    </div>
                  </section>
                );
              })}

              <button
                className="font-[700] leading-[24px] rounded-lg w-[208px] px-[32px] py-[18px] border border-solid border-[#F47E20] text-[#F47E20]"
                onClick={() => {
                  handleAddSubLesson();
                }}
              >
                + Add Sub-lesson
              </button>
            </section>
          </section>
        </section>
      </section>
    </section>
  );
}
