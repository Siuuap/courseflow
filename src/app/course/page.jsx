"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import CourseList from "@/components/CourseList.jsx";
import SearchBox from "@/components/SerachBox";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import LoadingPage from "@/components/LoadingPage";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

export default function Home() {
  const [course, setCourse] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  async function getCourse() {
    const res = await axios.get(`./api/courses?search=${search}&page=${page}`);
    setCourse(res.data.data);
    setIsLoading(false);
  }
  console.log(course);

  useEffect(() => {
    getCourse();
  }, [search, page]);

  async function getTotalCourse() {
    const res = await axios.get(`./api/courses?search=${search}&page=${1}`);

    setTotalPage(res.data.totalPage);
  }

  console.log(totalPage);
  useEffect(() => {
    getTotalCourse();
  }, [search]);

  return (
    <>
      <NavBar />
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <div className="our-course-container flex flex-col justify-item-center mt-16">
            <h1 className="our-courses text-center text-3xl font-bold ">
              Our Courses
            </h1>

            <SearchBox search={search} onSearch={setSearch} />
          </div>
          <div className="mb-[190px] ">
            <CourseList course={course} />

            <div className="pagination-btn flex flex-row justify-center ">
              <button
                className={` w-[160px] h-[60px] font-bold  rounded  ${
                  page <= 1 ? "text-gray-400" : "text-[#F47E20]"
                }`}
                onClick={() => (page <= 1 ? null : setPage(page - 1))}
              >
                <ArrowLeftIcon />
              </button>
              <span className="text-bold text-[#F47E20] text-xl mt-[18px]">
                {page}/{totalPage == 0 ? 1 : totalPage}
              </span>
              <button
                className={` w-[160px] h-[60px] font-bold  rounded  ${
                  page >= totalPage ? "text-gray-400" : "text-[#F47E20]"
                }`}
                onClick={() => (page >= totalPage ? null : setPage(page + 1))}
              >
                <ArrowRightIcon />
              </button>
            </div>
          </div>
        </>
      )}

      <Footer />
    </>
  );
}
