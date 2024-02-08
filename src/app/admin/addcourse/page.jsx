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
export default function DashBoardPage() {
  const [courseName, setCourseName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [courseSummary, setCourseSummary] = useState("");
  const [courseDetail, setCourseDetail] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const [coverImages, setCoverImages] = useState([]);
  const [videoTrailer, setVideoTrailer] = useState({});
  const [attachFile, setAttachFile] = useState({});

  async function uploadCoverImage(e) {
    e.preventDefault();
    try {
      const { data, error } = await supabaseAdmin.storage
        .from("courseimg")
        .upload(`test/${courseName}`, coverImages[0]);
      console.log(`upload sucessfully`);

      if (error) {
        console.log(`error from database`, error);
      }
      const url = supabaseAdmin.storage
        .from("courseimg")
        .getPublicUrl(data.path);
      console.log(`url`, url.data.publicUrl);
      setImgUrl(url.data.publicUrl);

      const formData = {
        courseName,
        price,
        duration,
        courseSummary,
        courseDetail,
        imgUrl,
        videoUrl,
        fileUrl,
      };
      createNewCourse(formData);
    } catch (error) {
      console.log(`error from request`, error);
    }
  }

  function handleCoverImage(e) {
    e.preventDefault();
    const id = Date.now();
    console.log(e.target.files[0]);
    setCoverImages([...coverImages, e.target.files[0]]);
  }

  async function createNewCourse(formData) {
    const data = formData;
    try {
      const response = await axios.post("/api/courses", data);
      console.log(response);
    } catch (error) {
      console.log(`error from add new course request`, error);
    }
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
          <div className="flex w-full items-center justify-between">
            <div className="flex">
              <p className="min-[375px]:text-[20px] font-medium leading-[30px] min-[1440px]:text-[24px]">
                Add Course
              </p>
              <button className="min-[1440px]:hidden">💩</button>
            </div>

            <div className="flex gap-[10px] ">
              <Link href="/admin/courselist">
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
        <section className="mx-auto min-[0px]:mt-[120px] m-[40px] flex items-center justify-center gap-[40px] min-[1440px]:w-[1200px] bg-[#F6F7FC] rounded-lg w-full">
          {/* Content (inner box) */}
          <section className="flex flex-col gap-[40px] min-[375px]:w-[375px] min-[768px]:w-[768px] border border-solid border-[#F6F7FC] rounded-lg min-[1200px]:block bg-white min-[1200px]:w-[1200px] min-[1440px]:w-[1120px] p-[40px] min-[1440px]:px-[100px]">
            <section className="flex flex-col gap-[4px]">
              <label htmlFor="name">Course Name *</label>
              <input
                className="outline-none border border-solid border-[#D6D9E4] px-[12px] py-[16px] rounded-[8px]"
                id="name"
                type="text"
                placeholder="Course Name"
              />
            </section>
            <section className="flex flex-col gap-[4px]">
              <label htmlFor="price">Price *</label>
              <input
                className="outline-none border border-solid border-[#D6D9E4] px-[12px] py-[16px] rounded-[8px]"
                id="price"
                type="text"
                placeholder="Price"
              />
            </section>
            <section className="flex flex-col gap-[4px]">
              <label htmlFor="price">Total Learning Time *</label>
              <input
                className="outline-none border border-solid border-[#D6D9E4] px-[12px] py-[16px] rounded-[8px]"
                id="length"
                type="text"
                placeholder="Total Learning Time"
              />
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
              <label htmlFor="coverImage">Course Image *</label>
              <input
                className="outline-none border border-solid border-[#D6D9E4] px-[12px] py-[16px] rounded-[8px]"
                id="coverImage"
                type="file"
              />
              <Image src={uploadImage} alt="image-with-upload-image-text" />
            </section>
            <section className="flex flex-col gap-[8px]">
              <label htmlFor="videoTrailer">Video Trailer *</label>
              <input
                className="outline-none border border-solid border-[#D6D9E4] px-[12px] py-[16px] rounded-[8px]"
                id="videoTraile"
                type="file"
              />
              <Image src={uploadVideo} alt="image-with-upload-video-text" />
            </section>
            <section className="flex flex-col gap-[8px]">
              <label htmlFor="videoTrailer">Attach File (Optional)</label>
              <input
                className="outline-none border border-solid border-[#D6D9E4] px-[12px] py-[16px] rounded-[8px]"
                id="videoTraile"
                type="file"
              />
              <Image src={uploadFile} alt="image-with-upload-file-text" />
            </section>
          </section>
        </section>
      </section>
    </section>
  );
}
