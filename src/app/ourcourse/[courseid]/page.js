"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

export default function CourseDetail({ params }) {
  const [courseById, setCourseById] = useState([]);
  const id = params?.courseid;
  console.log(id);

  async function fetchCourse() {
    const res = await axios.get(`/api/courses/ourcourse/${id}`);
    console.log(res);
    setCourseById(res.data);
  }

  useEffect(() => {
    fetchCourse();
  }, []);

  console.log(courseById);
  const course = courseById[0];
  console.log(course);

  return (
    <>
      <div className="container w-full  my-[30px] flex flex-row mx-auto ">
        <div className="detail-container w-[1120px] self-center ">
          <img
            src={course?.img_url}
            className="w-[740px] h-[460px] rounded-[8px]"
          />
          <section className="detail-section my-12 w-[740px] ">
            <h1 className=" text-[36px] font-medium ">Course Detail</h1>
            <p className="text-[#646D89] mt-6">{course?.description}</p>
          </section>
          <section>Module Samples</section>
        </div>
        <div className="sticky-box w-[357px] h-[450px] m-4 shadow-[0px_5px_5px_0px_rgba(100,109,137,1)] px-6 py-8 rounded-xl sticky top-10">
          <div>
            <p className="text-[#F47E20]">Course</p>
            <h1 className="text-2xl font-bold">{course?.name}</h1>
            <p className="text-[#646D89]">{course?.description.slice(0, 50)}</p>
            <p className="text-2xl font-bold text-[#646D89]">
              THB {course?.price + ".00"}
            </p>
          </div>
          <div className="sticky-box-btn-container border-t-2 border-[#d6d9e7] mt-6 ">
            <button className=" text-base text-[#F47E20] border-2 border-[#F47E20] hover:bg-[#f1c5a1] rounded-xl font-bold mt-6 mb-3 px-4 py-6 w-[310px] h-[60px] leading-3">
              Get in Desire Course
            </button>
            <button className="bg-[#2F5FAC] hover:bg-[#6897e4] rounded-xl text-white text-base font-bold px-4 py-6 w-[310px] h-[60px] text-center leading-4">
              Subscribe This Course
            </button>
          </div>
        </div>
      </div>
      <div>
        <ul>
          {courseById[0]?.lessons_test?.map((lesson, i) => (
            <CourseAccordion lesson={lesson} key={i} />
          ))}
        </ul>
      </div>
    </>
  );
}

function CourseAccordion({ lesson }) {
  return (
    <div>
      <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <span>{lesson.name}</span>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          {lesson.sub_lessons.map((sublesson, i) => (
            <AccordionPanel pb={4} key={i}>
              {sublesson.name}
            </AccordionPanel>
          ))}
        </AccordionItem>
      </Accordion>
    </div>
  );
}
