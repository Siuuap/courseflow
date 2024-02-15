import React from "react";
import ExamPic from "@/assets/images/ExamPic.png";
import deleteIcon from "@/assets/images/DeleteIcon.svg";
import EditIcon from "@/assets/images/EditIcon.svg";
import Link from "next/link";
import Image from "next/image";
import SideBar from "@/components/SideBar";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "@/contexts/authentication";
export default function AdminCourseLists({ courseData }) {
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

  return (
    <>
      {courseData.map(
        (
          { course_id, img_url, name, created_at, updated_at, lessons, price },
          index
        ) => {
          return (
            <section
              key={index}
              className=" p-4 rounded-lg bg-white mb-4 flex flex-col min-[768px]:flex-row items-start"
            >
              <section className="flex justify-center min-[768px]:basis-1/2 min-[375px]:mb-[10px]">
                <img
                  src={img_url}
                  alt="course-cover-image"
                  className="rounded-lg min-[768px]:w-[300px]"
                />
              </section>
              <section className="flex flex-col justify-start min-[768px]:basis-1/2 gap-[8px]">
                <section>
                  <h2 className="font-bold text-[16px]">{name}</h2>
                </section>
                <section className="flex gap-4">
                  <h2 className="basis-[20%]">Lesson</h2>
                  <p>{lessons.length} lessons</p>
                </section>

                <section className="flex gap-4">
                  <h2 className="basis-[20%]">Price</h2>
                  <p>{price}</p>
                </section>
                <section className="flex gap-4">
                  <h2 className="basis-[20%]">Created</h2>
                  <p>{created_at}</p>
                </section>
                <section className="flex gap-4">
                  <h2 className="basis-[20%]">Updated</h2>
                  <p>{updated_at}</p>
                </section>

                <section className="flex justify-center gap-[20px] basis-full mt-[12px]">
                  <button
                    className="flex justify-center items-center basis-1/2 bg-[#F1F2F6] hover:bg-[#C8CCDB] rounded-lg p-2"
                    onClick={() => {
                      deleteCourses(course_id);
                    }}
                  >
                    <Image
                      className="w-[24px] h-[24px] fill-red-600"
                      src={deleteIcon}
                      alt="delete-icon"
                    />
                    Delete
                  </button>
                  <button className="flex justify-center items-center basis-1/2 bg-[#F1F2F6] hover:bg-[#C8CCDB] rounded-lg p-2">
                    <Image
                      className="w-[24px] h-[24px]"
                      src={EditIcon}
                      alt="edit-icon"
                    />
                    Edit
                  </button>
                </section>
              </section>
            </section>
          );
        }
      )}
    </>
  );
}
