"use client";
import React, { useState } from "react";
import Link from "next/link";
import { supabaseAdmin } from "@/utils/db";

import SideBar from "@/components/SideBar";
import uploadFile from "@/assets/images/uploadFile.svg";
import uploadImage from "@/assets/images/uploadImage.svg";
import uploadVideo from "@/assets/images/uploadVideo.svg";
import Image from "next/image";
export default function DashBoardPage() {
  const [courseName, setCourseName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [courseSummary, setCourseSummary] = useState("");
  const [courseDetail, setCourseDetail] = useState("");
  const [coverImages, setCoverImages] = useState([]);
  const [videoTrailer, setVideoTrailer] = useState({});
  const [attachFile, setAttachFile] = useState({});

  async function uploadCoverImage(e) {
    e.preventDefault();
    const { data, error } = await supabaseAdmin.storage
      .from("courseimg")
      .upload(`test/${courseName}`, coverImages[0]);
    if (error) {
      console.log(error);
    }
    const url = supabaseAdmin.storage.from("courseimg").getPublicUrl(data.path);
  }

  function handleCoverImage(e) {
    e.preventDefault();
    const id = Date.now();
    console.log(e.target.files[0]);
    setCoverImages([...coverImages, e.target.files[0]]);
  }

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
            <Link href="/admin/courselist">
              <button className="border border-solis border-[#F47E20] text-[#F47E20] px-[32px] py-[18px] rounded-[12px] text-base hover:border-[#FBAA1C] hover:text-[#FBAA1C]">
                Cancel
              </button>
            </Link>

            <button
              onClick={uploadCoverImage}
              className="bg-[#2F5FAC] px-[32px] py-[18px] rounded-[12px] text-[#fff] text-base hover:bg-[#5483D0]"
            >
              Create
            </button>
          </div>
        </section>

        {/* Box2 Lower*/}
        <section className="mt-12 m-10 bg-white flex flex-col gap-[40px] py-[40px] px-[100px] rounded-md">
          <section className="flex flex-col gap-[4px]">
            <label htmlFor="course-name">Course Name *</label>
            <input
              className="border border-solid border-[#D6D9E4] rounded-md px-[16px] py-[12px] outline-none"
              type="text"
              name="course name"
              id="course-name"
              placeholder="Enter Course Name"
              value={courseName}
              onChange={(e) => {
                setCourseName(e.target.value);
              }}
            />
          </section>
          <section className="flex justify-between gap-[40px] min-[375px]:flex-col min-[1200px]:flex-row">
            <section className="flex flex-col basis-1/2 gap-[4px]">
              <label htmlFor="price">Price *</label>
              <input
                className="border border-solid border-[#D6D9E4] rounded-md px-[16px] py-[12px] outline-none"
                type="text"
                name="price"
                id="price"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </section>
            <section className="flex flex-col basis-1/2 gap-[4px]">
              <label htmlFor="total-learning-time">
                Total Learning Time *{" "}
              </label>
              <input
                className="border border-solid border-[#D6D9E4] rounded-md px-[16px] py-[12px] outline-none"
                type="text"
                name="total-learning-time"
                id="total-learning-time"
                placeholder="Enter Duration"
                value={duration}
                onChange={(e) => {
                  setDuration(e.target.value);
                }}
              />
            </section>
          </section>
          <section className="flex flex-col gap-[4px]">
            <label htmlFor="course-summary">Course Summary *</label>
            <input
              className="border border-solid border-[#D6D9E4] rounded-md px-[16px] py-[12px] h-[72px] outline-none p-[12px]"
              type="text"
              name="course-summary"
              id="course-summary"
              placeholder="Enter Course Summary"
              value={courseSummary}
              onChange={(e) => {
                setCourseSummary(e.target.value);
              }}
            />
          </section>
          <section className="flex flex-col gap-[4px]">
            <label htmlFor="course-detail">Course Detail * </label>
            <input
              className="flex border border-solid border-[#D6D9E4] rounded-md h-[192px] outline-none p-[12px]"
              type="text"
              name="course-detail"
              id="course-detail"
              placeholder="Enter Course Detail"
              value={courseDetail}
              onChange={(e) => {
                setCourseDetail(e.target.value);
              }}
            />
          </section>

          <section className="flex flex-col gap-[8px]">
            <label htmlFor="cover-image">Cover Image *</label>

            <input
              className="border border-solid border-[#D6D9E4] rounded-md "
              type="file"
              name="cover-image"
              id="cover-image"
              //เลือกได้หลายไฟล์
              multiple
              onChange={handleCoverImage}
              hidden
            />
            <Image
              className="cursor-pointer"
              src={uploadImage}
              alt="upload-cover-image"
            />
            <section>
              {coverImages.length === 0 ? null : (
                <div>
                  <img src={URL.createObjectURL(coverImages[0])} alt={""} />
                  <button
                    onClick={() => {
                      const newCoverImage = [...coverImages];
                      console.log(coverImages[0]);
                      newCoverImage.splice(0, 1);
                      setCoverImages(newCoverImage);
                    }}
                  >
                    X
                  </button>
                </div>
              )}

              {/* {Object.keys(coverImages).map((coverImageKey) => {
                const file = coverImages[coverImageKey];
                return (
                  <div key={coverImageKey}>
                    <img src={URL.createObjectURL(file)} alt={file.name} />
                  </div>
                );
              })} */}
            </section>
          </section>
          <section className="flex flex-col gap-[8px]">
            <label htmlFor="video-trailer">Video Trailer *</label>
            <input
              className="border border-solid border-[#D6D9E4] rounded-md "
              type="file"
              name="video-trailer"
              id="video-trailer"
              hidden
            />
            <Image
              className="cursor-pointer"
              src={uploadVideo}
              alt="upload-cover-image"
            />
          </section>
          <section className="flex flex-col gap-[8px]">
            <label htmlFor="attach-file">Attach File (Optional)</label>
            <input
              className="border border-solid border-[#D6D9E4] rounded-md"
              type="file"
              name="attach-file"
              id="attach-file"
              hidden
            />
            <Image
              className="cursor-pointer"
              src={uploadFile}
              alt="upload-cover-image"
            />
          </section>
        </section>
      </section>
    </section>
  );
}
