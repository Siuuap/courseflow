import React from "react";
import ExamPic from "@/assets/images/ExamPic.png";
import deleteIcon from "@/assets/images/DeleteIcon.svg";
import EditIcon from "@/assets/images/EditIcon.svg";
import Link from "next/link";
import Image from "next/image";
import SideBar from "@/components/SideBar";
import axios from "axios";
import { useState } from "react";

export default function AdminCourseLists({ courseData }) {
  return (
    <section className="flex flex-col min-[0px]:block min-[1200px]:hidden">
      {courseData.map(
        (
          { course_id, img_url, name, created_at, updated_at, lesson, price },
          index
        ) => {
          const createdDate = new Date(img_url);
          console.log(createdDate);
          return (
            <section
              key={index}
              className=" p-4 rounded-lg bg-white mb-4 flex flex-col items-center"
            >
              <section className="flex justify-center max-w-[500px]">
                <img
                  src={img_url}
                  alt="course-cover-image"
                  className="rounded-lg "
                />
              </section>
              <section className="flex flex-col justify-start w-full">
                <section>
                  <h2 className="font-bold text-[16px]">{name}</h2>
                </section>
                <section className="flex gap-4">
                  <h2 className="w-[60px]">Lesson</h2>
                  <p>{lesson} 6 lessons</p>
                </section>

                <section className="flex gap-4">
                  <h2 className="w-[60px]">Price</h2>
                  <p>{price}</p>
                </section>
                <section className="flex gap-4">
                  <h2 className="w-[60px]">Create</h2>
                  <p>{created_at}</p>
                </section>
                <section className="flex gap-4">
                  <h2 className="w-[60px]">Update</h2>
                  <p>{created_at}</p>
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
            </section>
          );
        }
      )}
    </section>
  );
}
