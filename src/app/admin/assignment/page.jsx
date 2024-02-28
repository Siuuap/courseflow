"use client";

import React, { useEffect } from "react";
import deleteIcon from "@/assets/images/DeleteIcon.svg";
import EditIcon from "@/assets/images/EditIcon.svg";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SideBar from "@/components/SideBar";

import axios from "axios";
import { useState } from "react";
import { supabase } from "@/utils/db";

import HamburgerMenu from "@/components/HamburgerMenu";
import DeleteAssignmentModal from "@/components/DeleteAssignmentModal";
export default function AssignmentPage() {
  const router = useRouter();

  const [assignmentData, setAssignmentData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [check, setCheck] = useState(0);

  useEffect(() => {
    getAssignment();
  }, [search, check]);

  useEffect(() => {
    getFilteredAssignments();
  }, [page, search, check]);

  async function getAssignment() {
    const limit = 8;
    setCheck(0);
    setPage(1);
    const { data: allData } = await supabase
      .from("assignments")
      .select("*")
      .ilike("question", `%${search}%`);

    setMaxPage(Math.ceil(allData.length / limit));

    //get limit n data per page
  }

  async function getFilteredAssignments() {
    const limit = 8;
    const { data, error } = await supabase
      .from("assignments")
      .select("*, sub_lessons(*, lessons(*, courses(*)))")
      .ilike("question", `%${search}%`)
      .order("created_at", { ascending: false })
      .range(limit * (page - 1), limit * page - 1);

    setAssignmentData(data);
  }

  function handleLength(text) {
    const limit = 16;

    if (text.length > limit) {
      return text.slice(0, limit) + "...";
    }

    return text;
  }

  function changePage(addPage) {
    if (page + addPage >= 1 && page + addPage <= maxPage) {
      setPage(page + addPage);
    }
  }

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

  return (
    <section className="flex justify-center mx-auto relative min-[1440px]:w-[1440px]">
      <div className="min-[0px]:hidden min-[1440px]:block ">
        {/* Box1 SideBar*/}
        <SideBar />
      </div>

      <section className="bg-[#F6F7FC] flex flex-col mx-auto min-[1440px]:ml-[240px]">
        {/* Box2 upper*/}
        <section className="border border-solid border-[#F6F7FC] bg-white flex min-[0px]:flex-col justify-between items-center rounded-lg min-[0px]:w-[375px] min-[0px]:p-[16px]  md:w-[768px] min-[1200px]:w-[1200px] min-[1440px]:w-[1200px] min-[1440px]:justify-between min-[1440px]:px-[40px] min-[1440px]:py-[16px] mx-auto fixed gap-[10px] md:gap-[0px]">
          <div className="flex w-full items-center justify-between relative ">
            <div className="flex gap-[8px] items-center ">
              <p className="min-[375px]:text-[20px] font-medium leading-[30px] min-[1440px]:text-[24px]">
                Course
              </p>
              <div className="min-[1440px]:hidden border border-solid border-[#D6D9E4] w-[30px] h-[30px] flex justify-center items-center rounded-md">
                <HamburgerMenu className="p-[20px]" />
              </div>
            </div>

            <div className="flex gap-[10px] ">
              <input
                className="outline-none min-[0px]:absolute min-[0px]:top-[60px] min-[0px]:left-0 min-[0px]:w-full md:static md:block md:w-fit px-[12px] py-[8px] border border-solid border-[#CCD0D7] rounded-[8px] min-[1440px]:px-[16px] min-[1440px]:py-[12px] min-[1440px]:w-[320`px]"
                type="search"
                placeholder="Search..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <Link href="/admin/addassignment">
                <button className="bg-[#2F5FAC] min-[0px]:px-[12px] min-[0px]:py-[8px] md:px-[32px] md:py-[18px] rounded-[12px] text-[#fff] md:text-[16px] hover:bg-[#5483D0]">
                  + Add Assignment
                </button>
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto min-[0px]:mt-[130px] md:mt-[120px] m-[40px] flex flex-col items-center gap-[40px] min-[1440px]:w-[1200px] bg-[#F6F7FC] rounded-lg">
          {/* Box2 Courselist Box*/}
          <div className="border border-solid border-[#F6F7FC] rounded-lg bg-white min-[1200px]:w-[1168px] min-[1200px]:m-[16px] min-[1440px]:w-[1120px]">
            <div className="bg-[#E4E6ED] flex  justify-start rounded-t-lg text-[14px] min-[0px]:hidden min-[1200px]:block min-[1200px]:w-[1168px] min-[1440px]:w-[1120px]">
              <div className="flex justify-start">
                <div className="w-[200px] px-[16px] py-[10px] font-normal">
                  Assignment detail
                </div>
                <div className="w-[200px] px-[16px] py-[10px] font-normal">
                  Course
                </div>
                <div className="w-[200px] px-[16px] py-[10px] font-normal">
                  Lesson
                </div>
                <div className="w-[200px] px-[16px] py-[10px] font-normal">
                  Sub-lesson
                </div>
                <div className="w-[200px] px-[16px] py-[10px] font-normal">
                  Created date
                </div>
                <div className="w-[120px] px-[16px] py-[10px] font-normal text-center">
                  Action
                </div>
              </div>
            </div>
            <div className="flex flex-col min-[0px]:gap-[30px] min-[1200px]:gap-0 min-[0px]:w-[343px] min-[0px]:m-[16px] md:w-[736px] min-[1200px]:w-[1168px] justify-center min-[1200px]:mx-[0px] min-[1440px]:w-[1120px]">
              {assignmentData.map((item, index) => {
                return (
                  <div
                    className="flex flex-col   md:flex-row md:justify-center min-[1200px]:justify-center gap-[14px] md:gap-[20px] min-[1200px]:gap-[0px] "
                    key={index}
                  >

                    <div className="flex  min-[0px]:gap-[16px] min-[1200px]:gap-[0px] min-[0px]:flex-col min-[0px]:items-start min-[768px]:w-[50%] min-[1200px]:flex-row min-[1200px]:justify-start min-[1200px]:w-full">
                      <div
                        className="min-[1200px]:px-[16px] min-[1200px]:py-[32px] min-[375px]:w-full min-[375px]:text-[16px]  min-[768px]:text-start min-[375px]:font-bold min-[1200px]:font-normal min-[1200px]:w-[200px]"
                        title={item.question}
                      >

                        {handleLength(item.question)}
                      </div>

                      <div className="flex min-[0px]:w-full min-[1200px]:w-[200px] min-[1200px]:px-[16px] min-[1200px]:py-[32px] min-[1200px]:text-center">
                        <p className="basis-[100px] min-[1200px]:hidden ">
                          {" "}
                          Course
                        </p>
                        <p
                          className="min-[1200px]:w-full min-[1200px]:text-start"
                          title={item.sub_lessons.lessons.courses.name}
                        >
                          {handleLength(item.sub_lessons.lessons.courses.name)}
                        </p>
                      </div>

                      <div className="flex min-[0px]:w-full min-[1200px]:w-[200px] min-[1200px]:px-[16px] min-[1200px]:py-[32px] min-[1200px]:justify-center">
                        <p className="basis-[100px] min-[1200px]:hidden">
                          Lesson
                        </p>
                        <p
                          className="min-[1200px]:w-full min-[1200px]:text-start"
                          title={item.sub_lessons.lessons.name}
                        >
                          {handleLength(item.sub_lessons.lessons.name)}
                        </p>
                      </div>

                      <div className="flex min-[0px]:w-full min-[1200px]:w-[200px] min-[1200px]:px-[16px] min-[1200px]:py-[32px] min-[1200px]:text-center">
                        <p className="basis-[100px] min-[1200px]:hidden">
                          Sub-lesson
                        </p>
                        <p
                          className="min-[1200px]:w-full min-[1200px]:text-start"
                          title={item.sub_lessons.name}
                        >
                          {handleLength(item.sub_lessons.name)}
                        </p>
                      </div>

                      <div className="flex min-[0px]:w-full min-[1200px]:w-[200px] min-[1200px]:px-[16px] min-[1200px]:py-[32px] min-[1200px]:text-center">
                        <p className="basis-[100px] min-[1200px]:hidden">
                          Created date
                        </p>
                        <p className="min-[1200px]:w-full min-[1200px]:text-start">
                          {formatDate(item.created_at)}
                        </p>
                      </div>

                      <div className="min-[0px]:w-full min-[1200px]:w-[120px] min-[1200px]:px-[16px] min-[1200px]:py-[32px]">
                        <div className="flex  min-[0px]:gap-[17px] min-[1200px]:gap-[17px] justify-center items-center">
                          <DeleteAssignmentModal
                            subLessonId={item.sub_lessons.sub_lesson_id}
                            type={2}
                            setCheck={setCheck}
                          />

                          <Link
                            href={`/admin/editassignment/${item.sub_lessons.sub_lesson_id}`}
                            className="flex justify-center items-center min-[0px]:bg-[#D6D9E4] min-[1200px]:bg-transparent min-[0px]:p-[10px] min-[1200px]:p-[0px] min-[0px]:w-[50%] rounded-md"
                          >
                            <button className="flex gap-[10px]">
                              <Image
                                className="min-[1200px]:w-[24px] min-[1200px]:h-[24px]"
                                src={EditIcon}
                                alt="edit-icon"
                              />
                              <p className="min-[1200px]:hidden">Edit</p>
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* <section className="flex flex-col min-[375px]:block min-[1200px]:hidden min-[375px]:w-[375px] md:w-[768px]">
            <AdminCourseLists courseData={courseData} />
          </section> */}

          <section className="flex">
            <button
              onClick={() => {
                changePage(-1);
              }}
            >
              {`<<<`}{" "}
            </button>
            <div>{page}</div>
            <button
              onClick={() => {
                changePage(1);
              }}
            >{` >>>`}</button>
          </section>
        </section>
      </section>
    </section>
  );
}
