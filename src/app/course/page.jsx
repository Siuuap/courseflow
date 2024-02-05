"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import CourseList from "./CourseList";
import { SearchBox } from "./SearchBox.jsx";
import { Loading } from "./Loading";

export default function Home() {
  const [course, setCourse] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  console.log(course);
  async function getCourse() {
    if (search && search.length >= 3) {
      const res = await axios.get(
        `./api/courses?search=${search}&page=${page}`
      );
      setCourse(res.data.data);
    }
    if (search.length === 0) {
      const res = await axios.get(`./api/courses`);
      setCourse(res.data.data);
    }
  }
  useEffect(() => {
    getCourse();
  }, [search]);

  return (
    <>
      <div className="our-course-container flex flex-col justify-item-center mt-16 ">
        <h1 className="our-courses text-center text-3xl font-bold">
          Our Courses
        </h1>

        <SearchBox search={search} onSearch={setSearch} />
      </div>
      {isLoading ? <Loading /> : <CourseList course={course} />}
    </>
  );
}
