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
import { Course } from "../CourseList";
import { findBestMatch } from "string-similarity";

export default function CourseDetail({ params }) {
  const [courseById, setCourseById] = useState([]);
  const id = params?.courseid;

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
          <section>
            <h1 className="font-medium text-3xl my-[24px]">Module Samples</h1>
            <div>
              <Accordion defaultIndex={[0]} allowMultiple>
                {courseById[0]?.lessons_test?.map((lesson, i) => (
                  <CourseAccordion lesson={lesson} index={i} key={i} />
                ))}
              </Accordion>
            </div>
          </section>
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
      <InterestingCourse courseName={course?.name} />
    </>
  );
}

function CourseAccordion({ lesson, index }) {
  console.log(index);
  return (
    <div>
      <AccordionItem className="w-[740px]">
        <h2>
          <AccordionButton className="h-[78px] ">
            <span className="font-medium text-2xl text-[#646D89] mr-3">
              {index.toString().length === 1
                ? 0 + (index + 1).toString()
                : index + 1}
            </span>
            <span className="font-medium text-2xl w-[638px] h-[30px] text-left">
              {lesson.name}
            </span>
            <AccordionIcon />
          </AccordionButton>
        </h2>

        {lesson.sub_lessons.map((sublesson, i) => (
          <AccordionPanel
            pb={4}
            key={i}
            className="text-[#646D89] ml-10 w-[740px] "
          >
            ● {sublesson.name}
          </AccordionPanel>
        ))}
      </AccordionItem>
    </div>
  );
}

function InterestingCourse({ courseName }) {
  const [otherCourse, setOtherCourse] = useState([]);
  const [similarName, setSimilarName] = useState([]);

  async function getInterestingCourse() {
    const res = await axios.get(`/api/courses`);
    setOtherCourse(res.data);
    console.log(res);
  }

  useEffect(() => {
    getInterestingCourse();
  }, []);
  console.log(otherCourse);

  function findSimilar() {
    const stringSimilarity = require("string-similarity");
    const refName = courseName;
    console.log(refName);
    if (refName) {
      const ratingName = stringSimilarity.findBestMatch(
        refName,
        otherCourse.map((course) => course.name)
      );
      console.log(ratingName);
      console.log(ratingName.ratings.slice(0, 3));
      const result = ratingName.ratings.slice(0, 3);
      console.log(result);
      setSimilarName(result);
    }
  }

  useEffect(() => findSimilar(), [otherCourse]);
  console.log(similarName);
  console.log(similarName[0]?.target);
  console.log(otherCourse);
  return (
    <div>
      <ul>
        {otherCourse.map((data, i) =>
          data.name == similarName[0].target ||
          data.name == similarName[1].target ||
          data.name == similarName[2].target ? (
            <OtherInterestingCourse data={data} key={i} />
          ) : null
        )}
      </ul>
    </div>
  );
}

function OtherInterestingCourse({ data }) {
  return (
    <div className="course-container max-w-xs mt-16 mx-3 ">
      <div className="course shadow-[0px_5px_5px_0px_rgba(100,109,137,1)] rounded-md">
        <div className="course-img ">
          <img
            src={data?.img_url}
            alt={data?.course_id}
            className="course-poster-img mb-6 w-[357px] h-[240px] block rounded-t-md"
          />
          <span className=" text-[#F47E20] ml-3">Course</span>
        </div>
        <div className="course-description-container m-3">
          <a
            href={`/ourcourse/${data?.course_id}`}
            className="course-name hover:text-[#F47E20] leading-[30px] text-[24px] w-[325px] h-[30px]"
          >
            {data?.name}
          </a>
          <p className="course-description text-[16px] leading-[24px] pb-3 text-[#646D89]">
            Description {data?.description.slice(0, 120)}
          </p>
        </div>
        <div className="course-detail-container  p-[16px] border-t-[1px]">
          <span className="mr-3 text-[#646D89] ">
            <i>
              <img src="icons/book.png" className="inline-block mr-3" />
            </i>
            {data?.lessons_test.length} Lesson(s)
          </span>
          <span className="text-[#646D89]">
            <i>
              <img src="icons/clock.png" className="inline-block mr-3 " />
            </i>
            {data?.length} Hr.
          </span>
        </div>
      </div>
    </div>
  );
}
