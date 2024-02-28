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
export default function AdminTemplate() {
  return (
    <section className="flex justify-center mx-auto relative min-[1440px]:w-[1440px]">
      <div className="min-[0px]:hidden min-[1440px]:block ">
        {/* Box1 SideBar*/}
        <SideBar />
      </div>

      <section className="bg-[#F6F7FC] flex flex-col mx-auto min-[1440px]:ml-[240px]">
        {/* Box2 upper*/}
        <section className="border border-solid border-[#F6F7FC] bg-white flex min-[0px]:flex-col justify-between items-center rounded-lg min-[0px]:w-[375px] min-[0px]:p-[16px]  md:w-[768px] min-[1200px]:w-[1200px] min-[1440px]:w-[1200px] min-[1440px]:justify-between min-[1440px]:px-[40px] min-[1440px]:py-[16px] mx-auto fixed gap-[10px] md:gap-[0px]">
          <div className="flex w-full items-center justify-between">
            <div className="flex">
              <p className="min-[375px]:text-[20px] font-medium leading-[30px] min-[1440px]:text-[24px]">
                Add Course
              </p>
              <button className="min-[1440px]:hidden">💩</button>
            </div>

            <div className="flex gap-[10px] ">
              <Link href="/admin/courselist">
                <button className="bg-[#fff] border border-solid border-[#F47E20] min-[0px]:px-[12px] min-[0px]:py-[8px] md:px-[32px] md:py-[18px] rounded-[12px] text-[#F47E20] md:text-[16px] hover:border-[#FBAA1C] hover:text-[#FBAA1C]">
                  Cancel
                </button>
              </Link>
              <Link href="/admin/addcourse">
                <button className="bg-[#2F5FAC] min-[0px]:px-[12px] min-[0px]:py-[8px] md:px-[32px] md:py-[18px] rounded-[12px] text-[#fff] md:text-[16px] hover:bg-[#5483D0]">
                  Create
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Box2 Courselist Box*/}
        {/* Contaner (outer gray box) */}
        <section className="mx-auto min-[0px]:mt-[130px] md:mt-[120px] m-[40px] flex flex-col items-center gap-[40px] min-[1440px]:w-[1200px] bg-[#F6F7FC] rounded-lg">
          {/* Content (inner box) don't forget to check display block*/}
          <section className="flex flex-col min-[375px]:block min-[375px]:w-[375px] md:w-[768px] border border-solid border-[#F6F7FC] rounded-lg min-[0px]:hidden bg-white min-[1200px]:w-[1200px] min-[1440px]:w-[1120px]"></section>
        </section>
      </section>
    </section>
  );
}
