"use client";

import React, { useEffect } from "react";
import ExamPic from "@/assets/images/ExamPic.png";
import deleteIcon from "@/assets/images/DeleteIcon.svg";
import EditIcon from "@/assets/images/EditIcon.svg";
import Link from "next/link";
import Image from "next/image";
import SideBar from "@/components/SideBar";
import axios from "axios";
import { useState } from "react";
import { useLessonContext } from "@/contexts/lessonContext";
import HamburgerMenu from "@/components/HamburgerMenu";
export default function DashBoardPage() {
  const [courseData, setCourseData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setpage] = useState(1);
  const { resetToDefault } = useLessonContext();
  async function getCourses() {
    try {
      const response = await axios.get(
        `/api/courses?search=${search}&page=${page}`
      );
      setCourseData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(`courseData`, courseData);
  async function deleteCourses(course_id) {
    const id = course_id;
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await axios.delete(`/api/courses/${id}`);
        getCourses();
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    resetToDefault();
    getCourses();
  }, [search, page]);

  function formatDate(d) {
    const date = new Date(d);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const time = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return `${day}/${month}/${year} ${time}`;
  }

  return (
    <section className="flex justify-center mx-auto relative min-[1440px]:w-[1440px]">
      <div className="min-[0px]:hidden min-[1440px]:block ">
        {/* Box1 SideBar*/}
        <SideBar />
      </div>

      <section className="bg-[#F6F7FC] flex flex-col mx-auto min-[1440px]:ml-[240px]">
        {/* Box2 upper*/}
        <section className="border border-solid border-[#F6F7FC] bg-white flex min-[0px]:flex-col justify-between items-center rounded-lg min-[0px]:w-[375px] min-[0px]:p-[16px]  min-[768px]:w-[768px] min-[1200px]:w-[1200px] min-[1440px]:w-[1200px] min-[1440px]:justify-between min-[1440px]:px-[40px] min-[1440px]:py-[16px] mx-auto fixed gap-[10px] min-[768px]:gap-[0px]">
          <div className="flex w-full items-center justify-between relative ">
            <div className="flex gap-[8px] items-center ">
              <p className="min-[375px]:text-[20px] font-medium leading-[30px] min-[1440px]:text-[24px]">
                Course
              </p>
              <div className="min-[1440px]:hidden border border-solid border-[#D6D9E4] w-[30px] h-[30px] flex justify-center items-center rounded-md">
                <HamburgerMenu className="p-[20px]" />
              </div>
            </div>

            <div className="flex gap-[10px] ">
              <input
                className="outline-none min-[0px]:absolute min-[0px]:top-[60px] min-[0px]:left-0 min-[0px]:w-full min-[768px]:static min-[768px]:block min-[768px]:w-fit px-[12px] py-[8px] border border-solid border-[#CCD0D7] rounded-[8px] min-[1440px]:px-[16px] min-[1440px]:py-[12px] min-[1440px]:w-[320`px]"
                type="search"
                placeholder="Search..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <Link href="/admin/addcourse">
                <button className="bg-[#2F5FAC] min-[0px]:px-[12px] min-[0px]:py-[8px] min-[768px]:px-[32px] min-[768px]:py-[18px] rounded-[12px] text-[#fff] min-[768px]:text-[16px] hover:bg-[#5483D0]">
                  + Add Course
                </button>
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto min-[0px]:mt-[130px] min-[768px]:mt-[120px] m-[40px] flex flex-col items-center gap-[40px] min-[1440px]:w-[1200px] bg-[#F6F7FC] rounded-lg">
          {/* Box2 Courselist Box*/}
          <div className="border border-solid border-[#F6F7FC] rounded-lg bg-white min-[1200px]:w-[1168px] min-[1200px]:m-[16px] min-[1440px]:w-[1120px]">
            <div className="bg-[#E4E6ED] flex justify-center rounded-t-lg text-[14px] min-[0px]:hidden min-[1200px]:block min-[1200px]:w-[1168px] min-[1440px]:w-[1120px]">
              <div className="flex justify-center">
                <div className="w-[48px] px-[16px] py-[10px] "></div>
                <div className="w-[96px] px-[16px] py-[10px] font-normal text-center">
                  Image
                </div>
                <div className="w-[268px] px-[16px] py-[10px] font-normal text-center">
                  Course Name
                </div>
                <div className="w-[105px] px-[16px] py-[10px] font-normal text-center">
                  Lesson
                </div>
                <div className="w-[105px] px-[16px] py-[10px] font-normal text-center">
                  Price
                </div>
                <div className="w-[188px] px-[16px] py-[10px] font-normal text-center">
                  Created date
                </div>
                <div className="w-[190px] px-[16px] py-[10px] font-normal text-center">
                  Updated date
                </div>
                <div className="w-[120px] px-[16px] py-[10px] font-normal text-center">
                  Action
                </div>
              </div>
            </div>
            <div className="flex flex-col min-[0px]:gap-[30px] min-[1200px]:gap-0 min-[0px]:w-[343px] min-[0px]:m-[16px] min-[768px]:w-[736px] min-[1200px]:w-[1168px] justify-center min-[1200px]:m-[0px] min-[1440px]:w-[1120px]">
              {courseData.map(
                (
                  {
                    course_id,
                    img_url,
                    name,
                    created_at,
                    updated_at,
                    lessons,
                    price,
                  },
                  index
                ) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-col min-[768px]:flex-row min-[768px]:justify-center min-[1200px]:justify-center gap-[14px] min-[768px]:gap-[20px] min-[1200px]:gap-[0px] "
                    >
                      <div className="flex w-[48px] items-center justify-center min-[0px]:hidden min-[1200px]:block min-[1200px]:px-[0px] min-[1200px]:py-[32px] text-center">
                        {index + 1}
                      </div>
                      <div className="min-[0px]:w-full min-[768px]:w-[50%] flex justify-center items-center min-[1200px]:px-[16px] min-[1200px]:py-[32px] min-[1200px]:w-[96px] ">
                        <img
                          src={img_url}
                          alt="cover-image-course"
                          className="rounded-md min-[375px]:h-[230px] min-[1200px]:h-[47px] object-cover"
                        />
                      </div>
                      <div className="flex min-[0px]:gap-[16px] min-[1200px]:gap-[0px] min-[0px]:flex-col min-[0px]:items-start min-[768px]:w-[50%] min-[1200px]:flex-row min-[1200px]:justify-start min-[1200px]:w-fit">
                        <div className="min-[1200px]:px-[10px] min-[1200px]:py-[32px] min-[375px]:w-full min-[375px]:text-[16px] text-center min-[768px]:text-start min-[375px]:font-bold min-[1200px]:font-normal min-[1200px]:w-[268px]">
                          {name}
                        </div>

                        <div className="flex min-[0px]:w-full min-[1200px]:w-[105px] min-[1200px]:px-[16px] min-[1200px]:py-[32px] min-[1200px]:text-center">
                          <p className="basis-[100px] min-[1200px]:hidden ">
                            {" "}
                            Lesson
                          </p>
                          <p className="min-[1200px]:w-full min-[1200px]:text-center">
                            {lessons.length}
                          </p>
                        </div>

                        <div className="flex min-[0px]:w-full min-[1200px]:w-[105px] min-[1200px]:px-[16px] min-[1200px]:py-[32px] min-[1200px]:justify-center">
                          <p className="basis-[100px] min-[1200px]:hidden">
                            Price
                          </p>
                          <p className="min-[1200px]:w-full min-[1200px]:text-center">
                            {price}
                          </p>
                        </div>

                        <div className="flex min-[0px]:w-full min-[1200px]:w-[188px] min-[1200px]:px-[16px] min-[1200px]:py-[32px] min-[1200px]:text-center">
                          <p className="basis-[100px] min-[1200px]:hidden">
                            Created at
                          </p>
                          <p className="min-[1200px]:w-full min-[1200px]:text-center">
                            {formatDate(created_at)}
                          </p>
                        </div>

                        <div className="flex min-[0px]:w-full min-[1200px]:w-[190px] min-[1200px]:px-[16px] min-[1200px]:py-[32px] min-[1200px]:text-center">
                          <p className="basis-[100px] min-[1200px]:hidden">
                            Updated at
                          </p>
                          <p className="min-[1200px]:w-full min-[1200px]:text-center">
                            {formatDate(updated_at)}
                          </p>
                        </div>

                        <div className="min-[0px]:w-full min-[1200px]:w-[120px] min-[1200px]:px-[16px] min-[1200px]:py-[32px]">
                          <div className="flex  min-[0px]:gap-[17px] min-[1200px]:gap-[17px] justify-center items-center">
                            <button
                              className="flex justify-center items-center min-[0px]:bg-[#D6D9E4] min-[1200px]:bg-transparent min-[0px]:p-[10px] min-[1200px]:p-[0px] min-[0px]:w-[50%] gap-[10px] rounded-md"
                              onClick={() => {
                                deleteCourses(course_id);
                              }}
                            >
                              <Image
                                className="min-[1200px]:w-[24px] min-[1200px]:h-[24px]"
                                src={deleteIcon}
                                alt="delete-icon"
                              />
                              <p className="min-[1200px]:hidden">Delete</p>
                            </button>

                            <Link
                              href={`/admin/editcourse/${course_id}`}
                              className="flex justify-center items-center min-[0px]:bg-[#D6D9E4] min-[1200px]:bg-transparent min-[0px]:p-[10px] min-[1200px]:p-[0px] min-[0px]:w-[50%] rounded-md"
                            >
                              <button className="flex gap-[10px]">
                                <Image
                                  className="min-[1200px]:w-[24px] min-[1200px]:h-[24px]"
                                  src={EditIcon}
                                  alt="edit-icon"
                                />
                                <p className="min-[1200px]:hidden">Edit</p>
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
          {/* <section className="flex flex-col min-[375px]:block min-[1200px]:hidden min-[375px]:w-[375px] min-[768px]:w-[768px]">
            <AdminCourseLists courseData={courseData} />
          </section> */}
        </section>
      </section>
    </section>
  );
}
