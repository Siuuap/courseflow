"use client";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import SubFooter from "@/components/SubFooter";
import CourseCard from "@/components/CourseCard";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { supabase } from "@/utils/db";
import { useSession } from "next-auth/react";
import LoadingPage from "@/components/LoadingPage";

export default function Learning() {
  const [courses, setCourses] = useState([]);
  const [coursesAll, setAllCourses] = useState([]);
  const [coursesInProgress, setCourseInProgress] = useState([]);
  const [coursesComplete, setCourseComplete] = useState([]);
  const [courseStatus, setCourseStatus] = useState(0);

  const [countComplete, setCountComplete] = useState(0);
  const [countInProgress, setCountInprogress] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  const { data: session, status } = useSession();

  async function getData() {
    try {
      const { data, error } = await supabase
        .from("users_courses")
        .select("*, courses(*,lessons(*))")
        .eq("user_id", session.user?.userId);

      const courseCompleteFiltered = data.filter((item) => {
        return item.status == 100;
      });

      const courseInProgressFiltered = data.filter((item) => {
        return item.status >= 0 && item.status <= 99;
      });

      setAllCourses(data);
      setCourseComplete(courseCompleteFiltered);
      setCourseInProgress(courseInProgressFiltered);

      setCountComplete(courseCompleteFiltered.length);
      setCountInprogress(courseInProgressFiltered.length);

      setIsLoading(false);
    } catch {}
  }

  async function getCourse() {
    if (courseStatus === 0) setCourses(coursesAll);
    else if (courseStatus === 1) setCourses(coursesInProgress);
    else if (courseStatus === 2) setCourses(coursesComplete);
  }

  useEffect(() => {
    getData();
  }, [status]);

  useEffect(() => {
    getCourse();
  }, [courseStatus, isLoading]);

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <section>
          <NavBar />
          <section className=" w-[330px]  mx-auto  mb-[40px] mt-[100px] ">
            <h1 className="   text-center mb-[60px]  text-[36px] ">
              My Courses
            </h1>

            <div className=" flex justify-between p-[8px] text-[16px]   font-normal  text-[#9AA1B9] ">
              <button
                className={` ${
                  courseStatus === 0
                    ? `text-black underline underline-offset-8`
                    : ""
                } focus:text-black focus:underline focus:underline-offset-8 hover:text-[#645f5f] `}
                onClick={() => {
                  setCourseStatus(0);
                }}
              >
                All Courses
              </button>
              <button
                className="focus:text-black focus:underline focus:underline-offset-8 hover:text-[#645f5f]"
                onClick={() => {
                  setCourseStatus(1);
                }}
              >
                Inprogress
              </button>
              <button
                className="focus:text-black focus:underline focus:underline-offset-8 hover:text-[#645f5f]"
                onClick={() => {
                  setCourseStatus(2);
                }}
              >
                Completed
              </button>
            </div>
          </section>

          <section className="w-[1120px]    mx-auto flex  justify-between gap-[24px] mb-[200px]">
            <div className=" sticky-box sticky top-1 flex flex-col   justify-start  items-center w-[357px]   h-fit py-[32px] px-[24px] gap-[24px] shadow-[4px_4px_24px_0px_rgba(0,0,0,0.08)] rounded-lg">
              <img
                src={session?.user?.url}
                alt="ProfileAvatar"
                className=" w-[120px] h-[120px] rounded-full"
              />

              <div className=" text-[24px] text-[#424C6B]">{`${session?.user?.firstName} ${session?.user?.lastName}`}</div>

              <div className=" flex gap-[24px] text-[#646D89]">
                <div className="w-143px p-[16px]  bg-[#F1F2F6] rounded-lg">
                  Course Inprogress
                  <div className=" mt-[24px] text-black text-[24px]  font-medium">
                    {countInProgress}
                  </div>
                </div>
                <div className="w-143px p-[16px] bg-[#F1F2F6] rounded-lg">
                  Course Complete
                  <div className=" mt-[24px] text-black text-[24px] font-medium">
                    {countComplete}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-start w-[668px] gap-[24px]">
              {courses.map((item) => {
                return (
                  <CourseCard
                    key={item.courses.course_id}
                    course={item.courses}
                  />
                );
              })}
            </div>
          </section>

          <SubFooter />
          <Footer />
        </section>
      )}
    </>
  );
}
