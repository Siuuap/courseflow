"use client";

import React, { useEffect } from "react";
import ExamPic from "@/assets/images/ExamPic.png";
import deleteIcon from "@/assets/images/DeleteIcon.svg";
import EditIcon from "@/assets/images/EditIcon.svg";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SideBar from "@/components/SideBar";
import axios from "axios";
import { useState } from "react";
const mockData = [
  {
    id: 8,
    image: ExamPic,
    courseName: "Service Design Essentials",
    lesson: "6 lessons",
    price: "3,559.00",
    created: "12/02/2022 10:30PM",
    updated: "12/02/2022 10:30PM",
    action: {
      delete: { deleteIcon },
      edit: { EditIcon },
    },
  },
  {
    id: 87,
    image: ExamPic,
    courseName: "Palm inwzaa",
    lesson: "6 lessons",
    price: "3,559.00",
    created: "12/02/2022 10:30PM",
    updated: "12/02/2022 10:30PM",
    action: {
      delete: { deleteIcon },
      edit: { EditIcon },
    },
  },
  {
    id: 6,
    image: ExamPic,
    courseName: "Service Design Essentials",
    lesson: "6 lessons",
    price: "3,559.00",
    created: "12/02/2022 10:30PM",
    updated: "12/02/2022 10:30PM",
    action: {
      delete: { deleteIcon },
      edit: { EditIcon },
    },
  },
];

export default function DashBoardPage() {
  const [courseData, setCourseData] = useState([]);

  async function getCourses() {
    try {
      const response = await axios.get("http://localhost:3000/api/courses");
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

  const router = useRouter();

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <section className="flex justify-center mx-auto max-w-[1440px] ">
      {/* Box1 SideBar*/}
      <SideBar />
      {/* Box2 upper*/}
      <section className="bg-[#F6F7FC] max-w-[1200px] flex flex-col">
        <section className=" bg-white h-[92px] min-[375px]:w-[375px] min-[768px]:w-[768px] min-[1200px]:w-[1200px] min-[320px]:px-[16px] flex justify-between items-center min-[1440px]:justify-between min-[1440px]:px-[40px] min-[1440px]:py-[16px] ">
          <div className="flex">
            <p className="min-[375px]:text-[20px] font-medium leading-[30px] min-[1440px]:text-[24px]">
              Course
            </p>
            <button className="min-[1440px]:hidden">💩</button>
          </div>

          <div className="flex gap-[16px] ">
            <input
              className="outline-none w-[100px] border border-solid border-[#CCD0D7] rounded-[8px] min-[1440px]:px-[16px] min-[1440px]:py-[12px]"
              type="search"
              placeholder="Search..."
            />
            <button
              className="bg-[#2F5FAC] min-[768px]:px-[32px] min-[768px]:py-[18px] rounded-[12px] text-[#fff] min-[768px]:text-[16px] hover:bg-[#5483D0]"
              onClick={() => router.push("/admin/dashboard/create")}
            >
              + Add Course
            </button>
          </div>
        </section>
        {/* Box2 Lower*/}
        <section className="mt-12 m-10 ">
          <table className=" rounded-lg min-[0px]:hidden min-[1200px]:block bg-white">
            <thead className="bg-[#E4E6ED] flex rounded-t-lg text-[14px] ">
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
                    lesson,
                    price,
                  },
                  index
                ) => {
                  return (
                    <tr key={index} className="flex justify-center">
                      <td className=" flex w-[48px] items-center justify-center">
                        {course_id}
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
                        {lesson}
                      </td>
                      <td className="w-[105px] px-[16px] py-[32px] text-center">
                        {price}
                      </td>
                      <td className="w-[188px] px-[10px] py-[32px] text-center">
                        {created_at}
                      </td>
                      <td className="w-[190px] px-[10px] py-[32px] text-center">
                        {updated_at}
                      </td>
                      <td className="w-[120px] px-[16px] py-[32px]">
                        <div className="flex gap-[17px] justify-center items-center">
                          <button onClick={() => {}}>
                            <Image
                              className="w-[24px] h-[24px] hover:fill-red-600"
                              src={deleteIcon}
                              alt="delete-icon"
                              onClick={() => {
                                deleteCourses(course_id);
                              }}
                            />
                          </button>
                          <button>
                            <Image
                              className="w-[24px] h-[24px]"
                              src={EditIcon}
                              alt="edit-icon"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
          <section className="flex flex-col min-[0px]:block min-[1200px]:hidden">
            {courseData.map(
              (
                {
                  course_id,
                  img_url,
                  name,
                  created_at,
                  updated_at,
                  lesson,
                  price,
                },
                index
              ) => {
                return (
                  <section
                    key={index}
                    className=" p-4 rounded-lg bg-white mb-4"
                  >
                    <section className="flex justify-center">
                      <img
                        src={img_url}
                        alt="course-cover-image"
                        className="rounded-lg w-[70px] h-[70px]"
                      />
                    </section>
                    <section>
                      <h2>Course Name</h2>
                      <p>{name}</p>
                    </section>
                    <section>
                      <h2>Lesson</h2>
                      <p>{lesson} lessons</p>
                    </section>

                    <section>
                      <h2>Price</h2>
                      <p>{price}</p>
                    </section>
                    <section>
                      <h2>Created Date</h2>
                      <p>{created_at}</p>
                    </section>
                    <section>
                      <h2>Updated Date</h2>
                      <p>{updated_at}</p>
                    </section>
                    <section className="flex justify-center gap-[20px]">
                      <button onClick={() => {}}>
                        <Image
                          className="w-[24px] h-[24px] hover:fill-red-600"
                          src={deleteIcon}
                          alt="delete-icon"
                          onClick={() => {
                            deleteCourses(course_id);
                          }}
                        />
                      </button>
                      <button>
                        <Image
                          className="w-[24px] h-[24px]"
                          src={EditIcon}
                          alt="edit-icon"
                        />
                      </button>
                    </section>
                  </section>
                );
              }
            )}
          </section>
        </section>
      </section>
    </section>
  );
}
