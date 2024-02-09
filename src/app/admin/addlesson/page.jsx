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
import arrowBack from "@/assets/images/arrowBack.svg";
import uploadVideoSubLesson from "@/assets/images/uploadVideoSubLesson.svg";
import DragIcon from "@/assets/images/DragIcon.svg";
export default function AdminTemplate() {
  return (
    <section className="flex justify-center mx-auto relative min-[1440px]:w-[1440px]">
      <div className="min-[0px]:hidden min-[1440px]:block ">
        {/* Box1 SideBar*/}
        <SideBar />
      </div>

      <section className="bg-[#F6F7FC] flex flex-col mx-auto min-[1440px]:ml-[240px]">
        {/* Box2 upper*/}
        <section className="border border-solid border-[#F6F7FC] bg-white flex min-[0px]:flex-col justify-between items-center rounded-lg min-[0px]:w-[375px] min-[0px]:p-[16px] min-[768px]:w-[768px] min-[1200px]:w-[1200px] min-[1440px]:w-[1200px] min-[1440px]:justify-between min-[1440px]:px-[40px] min-[1440px]:py-[16px] mx-auto fixed gap-[10px] min-[768px]:gap-[0px] ">
          <div className="flex w-full items-center justify-between ">
            <div className="flex items-center gap-[16px]">
              <button>
                <Image src={arrowBack} alt="arrow back icon" />
              </button>
              <div>
                <p className="min-[375px]:text-[14px] font-medium leading-[30px]  text-[#9AA1B9]">
                  Course{" "}
                  <span className="text-[#000]">'Coursename' 'LessonName'</span>
                </p>
                <div className="flex">
                  <p className="min-[375px]:text-[20px] font-medium leading-[30px] min-[1440px]:text-[24px]">
                    Add Lesson
                  </p>
                  <button className="min-[1440px]:hidden">💩</button>
                </div>
              </div>
            </div>

            <div className="flex gap-[10px] ">
              <Link href="/admin/addcourse">
                <button className="bg-[#fff] border border-solid border-[#F47E20] min-[0px]:px-[12px] min-[0px]:py-[8px] min-[768px]:px-[32px] min-[768px]:py-[18px] rounded-[12px] text-[#F47E20] min-[768px]:text-[16px] hover:border-[#FBAA1C] hover:text-[#FBAA1C]">
                  Cancel
                </button>
              </Link>
              <Link href="/admin/addcourse">
                <button className="bg-[#2F5FAC] min-[0px]:px-[12px] min-[0px]:py-[8px] min-[768px]:px-[32px] min-[768px]:py-[18px] rounded-[12px] text-[#fff] min-[768px]:text-[16px] hover:bg-[#5483D0]">
                  Create
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Box2 Courselist Box*/}
        {/* Contaner (outer gray box) */}
        <section className="gray-box mx-auto min-[0px]:mt-[130px] min-[768px]:mt-[120px] m-[40px] flex flex-col items-center gap-[40px] min-[1440px]:w-[1200px] rounded-lg ">
          {/* Content (inner box) don't forget to check display block*/}
          <section className="min-[375px]:flex min-[375px]:flex-col min-[375px]:w-[343px] min-[768px]:w-[736px] border border-solid border-[#F6F7FC] bg-white rounded-lg min-[0px]:hidden min-[1200px]:w-[1168px] min-[1440px]:w-[1120px] gap-[40px] min-[375px]:px-[16px] min-[375px]:py-[16px] min-[768px]:px-[100px] min-[768px]:py-[40px] min-[375px]:mx-[16px]">
            <div className="flex flex-col">
              <label htmlFor="lessonName">Lesson Name *</label>
              <input
                id="lessonName"
                className="outline-none border border-solid border-[#D6D9E4] px-[12px] py-[16px] rounded-[8px]"
                type="text"
                placeholder="Lesson Name"
              />
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
              <section className="flex min-[375px]:gap-[16px] min-[768px]:gap-[24px] justify-between bg-[#F6F7FC] rounded-lg min-[0px]:p-[16px] min-[768px]:px-[16px] min-[768px]:py-[24px] ">
                <div className="min-[768px]:block">
                  <Image src={DragIcon} alt="drag icon" />
                </div>
                <div className="flex flex-col gap-[24px] basis-full">
                  <div className="flex flex-col gap-[4px]">
                    <label htmlFor="subLessonName">Sub-lesson Name *</label>
                    <input
                      id="subLessonName"
                      className="outline-none border border-solid border-[#D6D9E4] px-[12px] py-[16px] rounded-[8px] w-[80%]"
                      type="text"
                      placeholder="Lesson Name"
                    />
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <label htmlFor="video">Video *</label>
                    <input
                      id="video"
                      className="outline-none border border-solid border-[#D6D9E4] px-[12px] py-[16px] rounded-[8px]"
                      type="file"
                      placeholder="Lesson Name"
                      hidden
                    />
                    <Image
                      src={uploadVideoSubLesson}
                      alt="image with upload video description"
                    />
                  </div>
                </div>
                <div>
                  <button className="text-[#2F5FAC] font-[700]">Delete</button>
                </div>
              </section>
              <section className="flex min-[375px]:gap-[16px] min-[768px]:gap-[24px] justify-between bg-[#F6F7FC] rounded-lg min-[0px]:p-[16px] min-[768px]:px-[16px] min-[768px]:py-[24px]">
                <div className="min-[768px]:block">
                  <Image src={DragIcon} alt="drag icon" />
                </div>
                <div className="flex flex-col gap-[24px] basis-full">
                  <div className="flex flex-col gap-[4px]">
                    <label htmlFor="subLessonName">Sub-lesson Name *</label>
                    <input
                      id="subLessonName"
                      className="outline-none border border-solid border-[#D6D9E4] px-[12px] py-[16px] rounded-[8px] w-[80%]"
                      type="text"
                      placeholder="Lesson Name"
                    />
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <label htmlFor="video">Video *</label>
                    <input
                      id="video"
                      className="outline-none border border-solid border-[#D6D9E4] px-[12px] py-[16px] rounded-[8px]"
                      type="file"
                      placeholder="Lesson Name"
                      hidden
                    />
                    <Image
                      src={uploadVideoSubLesson}
                      alt="image with upload video description"
                    />
                  </div>
                </div>
                <div>
                  <button className="text-[#2F5FAC] font-[700]">Delete</button>
                </div>
              </section>
            </section>
          </section>
        </section>
      </section>
    </section>
  );
}
