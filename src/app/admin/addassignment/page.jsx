"use client";
import React, { useState, useRef, useEffect } from "react";
import { supabase } from "@/utils/db";
import Link from "next/link";
import { useRouter } from "next/navigation";
import HamburgerMenu from "@/components/HamburgerMenu";
import SideBar from "@/components/SideBar";

export default function AddAssignmentPage() {
  const router = useRouter();

  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [subLessons, setSubLessons] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [lessonId, setLessonId] = useState("");
  const [subLessonId, setSubLessonId] = useState("");

  const [assignment, setAssignment] = useState("");
  const [duration, setDuration] = useState(1);

  const [isLoading, setIsLoading] = useState(true)

  const durationRange = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  const [checkFillCourse, setCheckFillCourse] = useState(true);
  const [checkFillLesson, setCheckFillLesson] = useState(true);
  const [checkFillSubLesson, setCheckFillSubLesson] = useState(true);
  const [checkFillAssignment, setCheckFillAssignment] = useState(true);

  async function getCourse() {
    const { data, error } = await supabase.from("courses").select("*");
    setCourses(data);
  }

  async function getLesson() {
    setLessonId("");
    setSubLessons([]);

    if (courseId) {
      const { data, error } = await supabase
        .from("lessons")
        .select("*")
        .eq("course_id", courseId);

      setLessons(data);
    }
  }

  async function getSubLesson() {
    setSubLessonId("");

    if (lessonId) {
      const { data, error } = await supabase
        .from("sub_lessons")
        .select("*, assignments(*)")
        .eq("lesson_id", lessonId);

      setSubLessons(data);
    }
  }

  async function handleSubmit() {
    setCheckFillCourse(true);
    setCheckFillLesson(true);
    setCheckFillSubLesson(true);
    setCheckFillAssignment(true);

    if (!courseId) setCheckFillCourse(false);
    if (!lessonId) setCheckFillLesson(false);
    if (!subLessonId) setCheckFillSubLesson(false);
    if (!assignment) setCheckFillAssignment(false);

    if (courseId && lessonId && subLessonId && assignment) {
      console.log(checkFillCourse);
      const { data, error } = await supabase.from("assignments").insert([
        {
          sub_lesson_id: subLessonId,
          question: assignment,
          duration: duration,
        },
      ]);

      router.push("/admin/assignment");
    }
  }

  useEffect(() => {
    getCourse();
  }, []);

  useEffect(() => {
    getLesson();
  }, [courseId]);

  useEffect(() => {
    getSubLesson();
  }, [lessonId]);

  return (
    <section className="flex justify-center mx-auto relative min-[1440px]:w-[1440px]">
      <div className="min-[0px]:hidden min-[1440px]:block ">
        {/* Box1 SideBar*/}
        <SideBar isLoading={isLoading} setIsLoading={setIsLoading} />
      </div>

      <section className="bg-[#F6F7FC] flex flex-col mx-auto min-[1440px]:ml-[240px]">
        {/* Box2 upper*/}
        <section className="border border-solid border-[#F6F7FC] bg-white flex min-[0px]:flex-col justify-between items-center rounded-lg min-[0px]:w-[375px] min-[0px]:p-[16px]  md:w-[768px] min-[1200px]:w-[1200px] min-[1440px]:w-[1200px] min-[1440px]:justify-between min-[1440px]:px-[40px] min-[1440px]:py-[16px] mx-auto fixed gap-[10px] md:gap-[0px] z-10">
          <div className="flex w-full items-center justify-between">
            <div className="flex gap-[8px] items-center">
              <p className="min-[375px]:text-[20px] font-medium leading-[30px] min-[1440px]:text-[24px]">
                Add Assignment
              </p>
              <div className="min-[1440px]:hidden border border-solid border-[#D6D9E4] w-[30px] h-[30px] flex justify-center items-center rounded-md">
                <HamburgerMenu />
              </div>
            </div>

            <div className="flex gap-[10px] ">
              <Link href="/admin/assignment">
                <button className="bg-[#fff] border border-solid border-[#F47E20] min-[0px]:px-[12px] min-[0px]:py-[8px] md:px-[32px] md:py-[18px] rounded-[12px] text-[#F47E20] md:text-[16px] hover:border-[#FBAA1C] hover:text-[#FBAA1C]">
                  Cancel
                </button>
              </Link>

              <button
                className="bg-[#2F5FAC] min-[0px]:px-[12px] min-[0px]:py-[8px] md:px-[32px] md:py-[18px] rounded-[12px] text-[#fff] md:text-[16px] hover:bg-[#5483D0]"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Create
              </button>
            </div>
          </div>
        </section>

        {/* Box2 Courselist Box*/}
        {/* Container (outer gray box) */}
        <section className="mx-auto min-[375px]:mt-[80px] min-[1440px]:mt-[120px] m-[40px] flex flex-col items-center justify-center gap-[30px] min-[1440px]:w-[1200px] bg-[#F6F7FC] rounded-lg w-full ">
          {/* Content (inner box) */}
          <section className="flex flex-col gap-[40px] min-[375px]:w-[350px] md:w-[743px] border border-solid border-[#F6F7FC] rounded-lg bg-white min-[1200px]:w-[1200px] min-[1440px]:w-[1120px] p-[40px] min-[1440px]:px-[100px]">
            <section className="relative flex flex-col gap-[4px]">
              <label htmlFor="name">Course</label>
              <select
                className={`outline-none border  border-solid px-[12px] py-[16px] rounded-[8px] min-[1200px]:w-[440px]`}
                value={courseId}
                onChange={(e) => {
                  setCourseId(e.target.value);
                }}
              >
                <option value="" disabled hidden>
                  Select Course
                </option>
                {courses.map((item, index) => {
                  return (
                    <option key={index} value={item.course_id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>

              {!checkFillCourse && (
                <div className="absolute bottom-[-30px] text-red-500">
                  Please select Course before submit
                </div>
              )}
            </section>
            <section className="flex gap-[40px] min-[375px]:flex-col md:flex-row">
              <section className="relative flex flex-col gap-[4px] basis-1/2">
                <label htmlFor="price">Lesson</label>
                <select
                  className={`outline-none border border-solid px-[12px] py-[16px] rounded-[8px]`}
                  value={lessonId}
                  onChange={(e) => {
                    setLessonId(e.target.value);
                  }}
                >
                  <option value="" disabled hidden>
                    Select Lesson
                  </option>
                  {lessons.map((item, index) => {
                    return (
                      <option key={index} value={item.lesson_id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
                {!checkFillLesson && (
                  <div className="absolute bottom-[-30px] text-red-500">
                    Please select Lesson before submit
                  </div>
                )}
              </section>
              <section className="relative flex flex-col gap-[4px] basis-1/2">
                <label htmlFor="length">Sub-lesson</label>
                <select
                  className={`outline-none border border-solid px-[12px] py-[16px] rounded-[8px]`}
                  value={subLessonId}
                  onChange={(e) => {
                    setSubLessonId(e.target.value);
                  }}
                >
                  <option value="" disabled hidden>
                    Select Sub-lesson
                  </option>
                  {subLessons.map((item, index) => {
                    return (
                      <option
                        key={index}
                        value={item.sub_lesson_id}
                        disabled={item.assignments ? true : false}
                      >
                        {item.name}
                      </option>
                    );
                  })}
                </select>
                {!checkFillSubLesson && (
                  <div className="absolute bottom-[-30px] text-red-500">
                    Please select Sub-lesson before submit
                  </div>
                )}
              </section>
            </section>

            <hr />
            <label className=" text-[#646D89] text-[20px]">
              Assignment detail
            </label>

            <section className="relative flex flex-col gap-[4px]">
              <label htmlFor="summary">Assignment *</label>
              <input
                className={`outline-none border border-solid px-[12px] py-[16px] rounded-[8px]`}
                id="summary"
                type="text"
                onChange={(e) => {
                  setAssignment(e.target.value);
                }}
              />
              {!checkFillAssignment && (
                <div className="absolute bottom-[-30px] text-red-500">
                  Please fill assignment before submit
                </div>
              )}
            </section>
            <section className="relative flex flex-col gap-[4px]">
              <label htmlFor="summary">Duration of assignment (day)</label>
              <select
                className={`outline-none border border-solid px-[12px] py-[16px] rounded-[8px]`}
                onChange={(e) => {
                  setDuration(e.target.value);
                }}
              >
                {durationRange.map((item) => {
                  return (
                    <option key={item} value={item}>
                      {item} {item === 1 ? "day" : "days"}
                    </option>
                  );
                })}
              </select>
            </section>
          </section>
        </section>
      </section>
    </section>
  );
}
