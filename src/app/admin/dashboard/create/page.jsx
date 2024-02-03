"use client";

import Image from "next/image";
import React, { useState } from "react";
import CourseFlowIcon from "@/assets/images/CourseFlowIcon.svg";
import CourseIcon from "@/assets/images/CourseIcon.svg";
import TaskIcon from "@/assets/images/TaskIcon.svg";

import LogoutIcon from "@/assets/images/LogoutIcon.svg";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

import SideBar from "@/components/SideBar";
export default function DashBoardPage() {
  const [courseName, setCourseName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [courseSummary, setCourseSummary] = useState("");
  const [courseDetail, setCourseDetail] = useState("");
  const [coverImages, setCoverImages] = useState({});
  const [videoTrailer, setVideoTrailer] = useState({});
  const [attachFile, setAttachFile] = useState({});
  const router = useRouter();
  function handleCoverImage(e) {
    const uniqueId = Date.now();
    console.log(e);
    setCoverImages({ ...coverImages, [uniqueId]: e.target.files[0] });
  }
  console.log(`coverImages is:`, coverImages);
  async function uploadfile() {}
  return (
    <section className="flex justify-center mx-auto max-w-[1440px] relative">
      <div className="min-[0px]:hidden min-[1440px]:block">
        {/* Box1 SideBar*/}
        <SideBar />
      </div>

      {/* Box2 upper*/}
      <section className="bg-[#F6F7FC] max-w-[1200px] flex flex-col min-[1440px]:ml-[240px]">
        <section className=" bg-white h-[92px] min-[375px]:min-w-[375px] min-[768px]:w-[768px] min-[1200px]:w-[1200px] min-[320px]:px-[16px] flex justify-between items-center min-[1440px]:justify-between min-[1440px]:px-[40px] min-[1440px]:py-[16px] ">
          <div className="flex">
            <p className="min-[375px]:text-[20px] font-medium leading-[30px] min-[1440px]:text-[24px]">
              Add Course
            </p>
            <button className="min-[1440px]:hidden">💩</button>
          </div>
          <div className="flex gap-[16px] ">
            <button
              className="border border-solis border-[#F47E20] text-[#F47E20] px-[32px] py-[18px] rounded-[12px] text-base hover:border-[#FBAA1C] hover:text-[#FBAA1C]"
              onClick={() => router.push("/admin/dashboard")}
            >
              Cancel
            </button>
            <button className="bg-[#2F5FAC] px-[32px] py-[18px] rounded-[12px] text-[#fff] text-base hover:bg-[#5483D0]">
              Create
            </button>
          </div>
        </section>

        {/* Box2 Lower*/}
        <section className="mt-12 m-10 bg-white flex flex-col gap-[40px]">
          <section className="flex flex-col">
            <label htmlFor="course-name">
              Course Name *
              <input
                className="border border-solid border-[#D6D9E4] rounded-md px-[16px] py-[12px]"
                type="text"
                name="course name"
                id="course-name"
                placeholder="Enter Course Name"
                value={courseName}
                onChange={(e) => {
                  setCourseName(e.target.value);
                }}
              />
            </label>
          </section>
          <section className="flex justify-between gap-[40px] min-[375px]:flex-col min-[1200px]:flex-row">
            <section className="flex flex-col">
              <label htmlFor="price">
                Price *
                <input
                  className="border border-solid border-[#D6D9E4] rounded-md px-[16px] py-[12px]"
                  type="text"
                  name="price"
                  id="price"
                  placeholder="Enter Price"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </label>
            </section>
            <section className="flex flex-col ">
              <label htmlFor="total-learning-time">
                Total Learning Time *
                <input
                  className="border border-solid border-[#D6D9E4] rounded-md px-[16px] py-[12px]"
                  type="text"
                  name="total-learning-time"
                  id="total-learning-time"
                  placeholder="Enter Duration"
                  value={duration}
                  onChange={(e) => {
                    setDuration(e.target.value);
                  }}
                />
              </label>
            </section>
          </section>
          <section className="flex flex-col">
            <label htmlFor="course-summary">
              Course Summary *
              <input
                className="border border-solid border-[#D6D9E4] rounded-md px-[16px] py-[12px] h-[72px]"
                type="text"
                name="course-summary"
                id="course-summary"
                placeholder="Enter Course Summary"
                value={courseSummary}
                onChange={(e) => {
                  setCourseSummary(e.target.value);
                }}
              />
            </label>
          </section>
          <section className="flex flex-col">
            <label htmlFor="course-detail">
              Course Detail *
              <input
                className="flex border border-solid border-[#D6D9E4] rounded-md h-[192px]"
                type="text"
                name="course-detail"
                id="course-detail"
                placeholder="Enter Course Detail"
                value={courseDetail}
                onChange={(e) => {
                  setCourseDetail(e.target.value);
                }}
              />
            </label>
          </section>

          {/* <section className="flex flex-col">
            <label htmlFor="cover-image">
              Cover Image *
              <input
                className="border border-solid border-[#D6D9E4] rounded-md"
                type="file"
                name="cover-image"
                id="cover-image"
                //เลือกได้หลายไฟล์
                multiple
                onChange={handleCoverImage}
              />
            </label>
            <section>
              {Object.keys(coverImages).map((coverImageKey) => {
                const file = coverImages[coverImageKey];
                console.log(`file is:`, file);
                return (
                  <div key={coverImageKey}>
                    <img src={URL.createObjectURL(file)} alt={file.name} />
                  </div>
                );
              })}
            </section>
          </section>
          <section className="flex flex-col">
            <label htmlFor="video-trailer">
              Video Trailer *
              <input
                className="border border-solid border-[#D6D9E4] rounded-md"
                type="file"
                name="video-trailer"
                id="video-trailer"
              />
            </label>
          </section>
          <section className="flex flex-col">
            <label htmlFor="attach-file">
              Attach File (Optional)
              <input
                className="border border-solid border-[#D6D9E4] rounded-md"
                type="file"
                name="attach-file"
                id="attach-file"
              />
            </label>
          </section> */}
        </section>
      </section>
    </section>
  );
}
