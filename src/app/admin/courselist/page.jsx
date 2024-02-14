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
import AdminCourseLists from "@/components/AdminCourseLists";
export default function DashBoardPage() {
  const [courseData, setCourseData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setpage] = useState(1);

  async function getCourses() {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/courses?search=${search}&page=${page}`
      );
      setCourseData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteCourses(course_id) {
    const id = course_id;
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await axios.delete(`http://localhost:3000/api/courses/${id}`);
        getCourses();
      } catch (error) {
        console.log(error);
      }
    }
  }
  console.log(courseData);
  useEffect(() => {
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
  console.log(courseData);
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
            <div className="flex">
              <p className="min-[375px]:text-[20px] font-medium leading-[30px] min-[1440px]:text-[24px]">
                Course
              </p>
              <button className="min-[1440px]:hidden">💩</button>
            </div>

            <div className="flex gap-[10px] ">
              <input
                className="outline-none min-[375px]:absolute min-[375px]:top-[60px] min-[375px]:left-0 min-[375px]:w-full  min-[768px]:static  min-[768px]:block min-[768px]:w-fit px-[12px] py-[8px] border border-solid border-[#CCD0D7] rounded-[8px] min-[1440px]:px-[16px] min-[1440px]:py-[12px]"
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
          <table className="border border-solid border-[#F6F7FC] rounded-lg min-[0px]:hidden min-[1200px]:block bg-white min-[1200px]:w-[1200px] min-[1440px]:w-[1120px]">
            <thead className="bg-[#E4E6ED] flex rounded-t-lg text-[14px] w-full">
              <tr>
                <th className="w-[48px] px-[16px] py-[10px] "></th>
                <th className="w-[96px] px-[16px] py-[10px] font-normal">
                  Image
                </th>
                <th className="w-[268px] px-[16px] py-[10px] font-normal">
                  Course Name
                </th>
                <th className="w-[105px] px-[16px] py-[10px] font-normal">
                  Lesson
                </th>
                <th className="w-[105px] px-[16px] py-[10px] font-normal">
                  Price
                </th>
                <th className="w-[188px] px-[16px] py-[10px] font-normal">
                  Created date
                </th>
                <th className="w-[190px] px-[16px] py-[10px] font-normal">
                  Updated date
                </th>
                <th className="w-[120px] px-[16px] py-[10px] font-normal">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
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
                    <tr key={index} className="flex justify-center">
                      <td className=" flex w-[48px] items-center justify-center">
                        {index + 1}
                      </td>
                      <td className="w-[96px] flex justify-center items-center">
                        {/* <Image
                          className="w-[70px] h-[70px]"
                          src={img}
                          alt="example"
                          width={70}
                          height={70}
                        /> */}
                        <img
                          src={img_url}
                          alt="cover-image-course"
                          width={70}
                          height={70}
                        />
                      </td>

                      <td className="w-[268px] px-[16px] py-[32px]">{name}</td>
                      <td className="w-[105px] px-[16px] py-[32px] text-center">
                        {lessons.length}
                      </td>
                      <td className="w-[105px] px-[16px] py-[32px] text-center">
                        {price}
                      </td>
                      <td className="w-[188px] px-[10px] py-[32px] text-center">
                        {formatDate(created_at)}
                      </td>
                      <td className="w-[190px] px-[10px] py-[32px] text-center">
                        {formatDate(updated_at)}
                      </td>
                      <td className="w-[120px] px-[16px] py-[32px]">
                        <div className="flex gap-[17px] justify-center items-center">
                          <button className="flex justify-center items-center">
                            <Image
                              className="w-[24px] h-[24px] hover:fill-red-600"
                              src={deleteIcon}
                              alt="delete-icon"
                              onClick={() => {
                                deleteCourses(course_id);
                              }}
                            />
                          </button>
                          <Link href={`/admin/editcourse/${course_id}`}>
                            <button className="flex justify-center items-center">
                              <Image
                                className="w-[24px] h-[24px]"
                                src={EditIcon}
                                alt="edit-icon"
                              />
                            </button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
          <section className="flex flex-col min-[375px]:block min-[1200px]:hidden min-[375px]:w-[375px] min-[768px]:w-[768px]">
            <AdminCourseLists courseData={courseData} />
          </section>
        </section>
      </section>
    </section>
  );
}
