"use client";
import React, { useState } from "react";
import Link from "next/link";
import { supabaseAdmin } from "@/utils/db";

import SideBar from "@/components/SideBar";
import uploadFile from "@/assets/images/uploadFile.svg";
import uploadImage from "@/assets/images/uploadImage.svg";
import uploadVideo from "@/assets/images/uploadVideo.svg";
import Image from "next/image";
import LessonBox from "@/components/LessonBox";
import axios from "axios";
export default function EditCourse({ params }) {
  const course_id = params.course_id;

  console.log(course_id);
  return (
    <section className="flex justify-center mx-auto relative min-[1440px]:w-[1440px]">
      <div className="min-[0px]:hidden min-[1440px]:block ">
        {/* Box1 SideBar*/}
        <SideBar />
      </div>

      <section className="bg-[#F6F7FC] flex flex-col mx-auto min-[1440px]:ml-[240px]">
        {/* Box2 upper*/}
        <section className="border border-solid border-[#F6F7FC] bg-white flex min-[0px]:flex-col justify-between items-center rounded-lg min-[0px]:w-[375px] min-[0px]:p-[16px]  min-[768px]:w-[768px] min-[1200px]:w-[1200px] min-[1440px]:w-[1200px] min-[1440px]:justify-between min-[1440px]:px-[40px] min-[1440px]:py-[16px] mx-auto fixed gap-[10px] min-[768px]:gap-[0px]">
          <div className="flex w-full items-center justify-between">
            <div className="flex">
              <p className="min-[375px]:text-[20px] font-medium leading-[30px] min-[1440px]:text-[24px]">
                Course 'CourseName'
              </p>
              <button className="min-[1440px]:hidden">💩</button>
            </div>

            <div className="flex gap-[10px] ">
              <Link href="/admin/courselist">
                <button className="bg-[#fff] border border-solid border-[#F47E20] min-[0px]:px-[12px] min-[0px]:py-[8px] min-[768px]:px-[32px] min-[768px]:py-[18px] rounded-[12px] text-[#F47E20] min-[768px]:text-[16px] hover:border-[#FBAA1C] hover:text-[#FBAA1C]">
                  Cancel
                </button>
              </Link>

              <button className="bg-[#2F5FAC] min-[0px]:px-[12px] min-[0px]:py-[8px] min-[768px]:px-[32px] min-[768px]:py-[18px] rounded-[12px] text-[#fff] min-[768px]:text-[16px] hover:bg-[#5483D0]">
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
            <section className="flex flex-col gap-[4px]">
              <label htmlFor="name">Course Name *</label>
              <input
                className="outline-none border border-solid border-[#D6D9E4] px-[12px] py-[16px] rounded-[8px]"
                id="name"
                type="text"
                placeholder="Course Name"
              />
            </section>
            <section className="flex gap-[40px] min-[375px]:flex-col min-[768px]:flex-row">
              <section className="flex flex-col gap-[4px] basis-1/2">
                <label htmlFor="price">Price *</label>
                <input
                  className="outline-none border border-solid border-[#D6D9E4] px-[12px] py-[16px] rounded-[8px]"
                  id="price"
                  type="text"
                  placeholder="Price"
                />
              </section>
              <section className="flex flex-col gap-[4px] basis-1/2">
                <label htmlFor="price">Total Learning Time *</label>
                <input
                  className="outline-none border border-solid border-[#D6D9E4] px-[12px] py-[16px] rounded-[8px]"
                  id="length"
                  type="text"
                  placeholder="Total Learning Time"
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
              />
            </section>
            <section className="flex flex-col gap-[4px]">
              <label htmlFor="description">Course Detail *</label>
              <input
                className="outline-none border border-solid border-[#D6D9E4] px-[12px] py-[16px] rounded-[8px]"
                id="description"
                type="text"
                placeholder="Course Detail"
              />
            </section>
            <section className="flex flex-col gap-[8px]">
              <label
                htmlFor="coverImage"
                className="w-fit cursor-pointer flex flex-col gap-[8px]"
              >
                Course Image *
                <input
                  className="outline-none border border-solid border-[#D6D9E4] px-[12px] py-[16px] rounded-[8px] sr-only"
                  id="coverImage"
                  type="file"
                />
                <Image src={uploadImage} alt="image-with-upload-image-text" />
              </label>
            </section>
            <section className="flex flex-col gap-[8px]">
              <label
                htmlFor="videoTrailer"
                className="w-fit cursor-pointer flex flex-col gap-[8px]"
              >
                Video Trailer *
                <input
                  className="outline-none border border-solid border-[#D6D9E4] px-[12px] py-[16px] rounded-[8px] sr-only"
                  id="videoTraile"
                  type="file"
                />
                <Image src={uploadVideo} alt="image-with-upload-video-text" />
              </label>
            </section>
            <section className="flex flex-col gap-[8px]">
              <label
                htmlFor="videoTrailer"
                className="w-fit cursor-pointer flex flex-col gap-[8px]"
              >
                Attach File (Optional)
                <input
                  className="outline-none border border-solid border-[#D6D9E4] px-[12px] py-[16px] rounded-[8px] sr-only"
                  id="videoTraile"
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
