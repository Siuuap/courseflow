"use client";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Progress,
  CircularProgress,
} from "@chakra-ui/react";
import axios from "axios";
import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";

export default function Learning({ params }) {
  const [login, setLogin] = useState(true);
  const [courseById, setCourseById] = useState([]);

  async function fetchCourseById() {
    const id = params.courseid;
    const res = await axios.get(`/api/courses/${id}`);
    setCourseById(res.data.data);
  }
  useEffect(() => fetchCourseById(), []);
  console.log(courseById);
  return (
    <>
      <NavBar />
      <div className="page-container w-[1440px] flex justify-items-center mx-auto">
        <LessonAccordion courseById={courseById} />
        <CourseVideo courseById={courseById} />
      </div>
      <Footer />
    </>
  );
}

function LessonAccordion({ courseById }) {
  const course = courseById[0];
  const [progress, setProgress] = useState(50);
  const [subProgress, setSubProgress] = useState(90);
  console.log(courseById);
  return (
    <div className="shadow-[0px_5px_5px_0px_rgba(100,109,137,1)] rounded-md px-[24px] py-[32px]">
      <div className="Course-progress-container w-[358px]  ">
        <p className="text-[#F47E20] leading-[21px] mb-[26px]">Course</p>
        <div className="w-[310px] h-[86px]">
          <h1 className="text-bold w-[310px] h-[30px]">{course?.name}</h1>
          <p>{course?.description.slice(0, 50)}</p>
        </div>
        <div className="progress">
          <span>{progress}% complete</span>
          <Progress
            className="w-[310px] rounded mt-[15px] mb-[30px] "
            value={progress}
          />
        </div>
      </div>
      <div className="lesson-accordion">
        <Accordion defaultIndex={[0]} allowMultiple>
          {course?.lessons.map((lesson, i) => (
            <AccordionItem key={i}>
              <h2>
                <AccordionButton>
                  <span className="font-medium text-2xl text-[#646D89] mr-3">
                    {i.toString().length === 1 ? 0 + (i + 1).toString() : i + 1}
                  </span>

                  <span>{lesson.name}</span>
                  <AccordionIcon className="" />
                </AccordionButton>
              </h2>
              {lesson.sub_lessons.map((subLesson, i) => (
                <AccordionPanel pb={4} key={i}>
                  <CircularProgress
                    size="14px"
                    value={subProgress}
                    className="pb-[3px] mr-[10px]"
                  />
                  {subLesson.name}
                </AccordionPanel>
              ))}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

function CourseVideo({ courseById }) {
  const course = courseById[0];
  console.log(course);
  return (
    <div className="my-[30px]">
      <div className="video-container ml-[15px]">
        <h2 className="font-medium text-4xl mb-[30px]">{course?.name}</h2>
        <video width="740" height="460" controls>
          <source src={course?.video_url} type="video/mp4"></source>
        </video>
        <div className="assignment-section mt-[50px] bg-[#E5ECF8] p-[15px] rounded-md relative">
          <div className="assignment-container flex flex-col items-start ">
            <h2>Assignment</h2>
            <p>What are the 4 elements of service design?</p>
            <input
              placeholder="Answer..."
              className="w-[692px] h-[96px] rounded-md"
            ></input>
            <div className="send-assignment flex flex-row justify-between w-[710px]">
              <button className="w-[204px] h-[60px] bg-[#2F5FAC] text-white rounded mt-[20px]">
                Send Assignment
              </button>
              <p className="mt-[45px] text-[#646D89]">Assign within 2 days</p>
            </div>
          </div>
          <p className="absolute top-3 right-4 bg-[#FFFBDB] text-[#996500] p-[5px] rounded">
            Pending
          </p>
        </div>
      </div>
    </div>
  );
}
