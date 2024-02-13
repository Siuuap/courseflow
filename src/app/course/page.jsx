"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import CourseList from "@/components/CourseList.jsx";
import SearchBox from "@/components/SerachBox";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { resolve } from "styled-jsx/css";

export default function Home() {
  const [course, setCourse] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  async function getCourse() {
    const res = await axios.get(`./api/courses?search=${search}&page=${page}`);
    setCourse(res.data.data);
  }
  console.log(course);
  useEffect(() => {
    getCourse();
  }, [search]);

  return (
    <>
      <NavBar />
      <div className="our-course-container flex flex-col justify-item-center mt-16">
        <h1 className="our-courses text-center text-3xl font-bold">
          Our Courses
        </h1>

        <SearchBox search={search} onSearch={setSearch} />
      </div>

      <div className="mb-[190px]">
        <CourseList course={course} />
      </div>

      <Footer />
    </>
  );
}
