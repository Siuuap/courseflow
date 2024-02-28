"use client";

import axios from "axios";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import React from "react";
import { supabase } from "@/utils/db";
import { useEffect, useState } from "react";
import CourseCard from "@/components/CourseCard";
import { useSession } from "next-auth/react";

function DesiredCoursePage() {
  const [courses, setCourse] = useState([]);
  const { data: session, status } = useSession();

  async function getData() {
    console.log(session);

    if (status === "authenticated") {
      const { data, error } = await supabase
        .from("users_desired")
        .select("*, courses(*,lessons(*))")
        .eq("user_id", session.user?.userId);

      console.log("test");
      console.log(data);
      setCourse(data);
    }
  }

  useEffect(() => {
    getData();
  }, [status]);

  return (
    <>
      <NavBar />
      <section className="flex justify-center ">
        <div className="text-[36px] mt-[60px] mb-[40px]">Desired Courses</div>
      </section>

      <div className="flex flex-wrap justify-start w-[1120px] gap-[24px] mx-auto">
        {courses.map((item) => {
          return (
            <CourseCard key={item.courses.course_id} course={item.courses} />
          );
        })}
      </div>

      <Footer />
    </>
  );
}

export default DesiredCoursePage;
