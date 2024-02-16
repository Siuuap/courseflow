"use client";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Progress,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import axios from "axios";
import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import { useSession } from "next-auth/react";
import Button from "@/components/Button.jsx";

export default function Learning({ params }) {
  const { data: session, status } = useSession();
  const [courseById, setCourseById] = useState([]);
  const [currentVideo, setCurrentVideo] = useState({});
  const [isLoading, setIsloading] = useState(false);
  const [subLessonProgress, setSubLessonProgress] = useState([]);
  const [progress, setProgress] = useState(0);

  console.log(currentVideo);

  useEffect(() => {
    function sumProgress() {
      const progressPercentage = subLessonProgress.map((sub) => sub.status);
      const sumProgress =
        progressPercentage.reduce(function (acc, cur) {
          return acc + cur;
        }, 0) / progressPercentage.length;
      console.log(sumProgress);
      setProgress(Math.round(sumProgress));
    }
    sumProgress();
  }, [subLessonProgress]);
  function handleVideo(url, id) {
    setCurrentVideo({ url, id });
  }

  useEffect(() => {
    async function fetchCourseById() {
      console.log(status);
      if (status === "authenticated") {
        const courseId = params.courseid;
        console.log(courseId);
        const res = await axios.get(
          `/api/learning/${courseId}?userid=${session?.user?.userId}`
        );

        setCourseById(res.data.data);
        console.log(res);
        setSubLessonProgress(res?.data?.data[0]?.users_sub_lessons);
        setCurrentVideo({
          url: res.data.data[0].courses.lessons[0].sub_lessons[0].video_url,
          id: res.data.data[0].courses.lessons[0].sub_lessons[0].sub_lesson_id,
        });
        setIsloading(true);
      }
    }
    fetchCourseById();
  }, [status]);

  function handleUpdateSubProgress(e) {
    let currentSubProgress = (e.target.currentTime / e.target.duration) * 100;
    if (currentSubProgress >= 80) {
      currentSubProgress = 100;
    }

    let newSublessonProgress = subLessonProgress.map((arr) => arr);

    const newProgress = newSublessonProgress.find((object, i) => {
      if (
        object.sub_lesson_id === currentVideo.id &&
        currentSubProgress - 20 >= object.status
      ) {
        newSublessonProgress[i] = { ...object, status: currentSubProgress };

        async function postNewStatus() {
          const courseId = params.courseid;
          const res = await axios.post(
            `/api/learning/${courseId}?user=${session.user.userId}&subid=${
              object.sub_lesson_id
            }&status=${Math.round(currentSubProgress)}&usercourseid=${
              object.user_course_id
            }`
          );
        }
        postNewStatus();
        setSubLessonProgress(newSublessonProgress);

        return true;
      }
    });
  }
  useEffect(() => {
    if (courseById[0]) {
      async function updateProgress() {
        const courseId = params.courseid;
        const res = await axios.post(
          `/api/learning/${courseId}/progressbar?user=${
            session?.user?.userId
          }&status=${Math.round(progress)}&usercourseid=${
            courseById[0].user_course_id
          }
          `
        );
      }
      updateProgress();
    }
  }, [progress]);

  return (
    <>
      <NavBar />
      <div className="page-container w-[1440px] flex justify-items-center mx-auto mt-[80px] mb-[10px]">
        {isLoading && subLessonProgress && currentVideo && (
          <LessonAccordion
            courseById={courseById}
            handleVideo={handleVideo}
            subLessonProgress={subLessonProgress}
            progress={progress}
            currentVideo={currentVideo}
          />
        )}
        {isLoading == true && currentVideo && (
          <CourseVideo
            courseById={courseById}
            currentVideo={currentVideo}
            handleUpdateSubProgress={handleUpdateSubProgress}
          />
        )}
      </div>
      <div className="btn-container flex flex-row justify-between w-[1440px] h-[100px] mx-[150px] ">
        <Button className="text-[#2F5FAC] font-bold w-[162px] h-[60px]">
          Previous Lesson
        </Button>
        <Button className="bg-[#2F5FAC] text-white font-bold w-[162px] h-[60px] rounded-lg">
          Next Lesson
        </Button>
      </div>
      <Footer />
    </>
  );
}

function LessonAccordion({
  courseById,
  handleVideo,
  subLessonProgress,
  progress,
  currentVideo,
}) {
  const course = courseById[0];

  function findMatchId(subLessonProgress, sublesson) {
    const match = subLessonProgress.filter(
      (id) => id.sub_lesson_id === sublesson.sub_lesson_id
    );

    return match[0].status;
  }

  return (
    <div className="shadow-[0px_0px_5px_0px_rgba(100,109,137,1)] rounded-md px-[24px] py-[32px] h-[950px] mb-[5px] ">
      <div className="Course-progress-container w-[358px]  ">
        <p className="text-[#F47E20] leading-[21px] mb-[26px]">Course</p>
        <div className="w-[310px] h-[86px]">
          <h1 className="text-bold w-[310px] h-[30px]">
            {course.courses.name}
          </h1>
          <p>{course.courses.description.slice(0, 50)}</p>
        </div>
        <div className="progress h-[40px]">
          {progress === 100 ? (
            <p className="text-[24px] text-white bg-[#2FAC8E]  h-[40px] rounded w-[358px] mx-auto text-center ">
              completed
            </p>
          ) : (
            <div className="mb-[15px]">
              <span>{progress}% complete</span>
              <Progress
                className="w-[310px] rounded mt-[15px] "
                value={progress}
              />
            </div>
          )}
        </div>
      </div>
      <div className="lesson-accordion mt-[20px] overflow-y  h-[600px]">
        <Accordion defaultIndex={[0]} allowMultiple>
          {course.courses.lessons.map((lesson, i) => (
            <AccordionItem key={i}>
              <h2>
                <AccordionButton>
                  <span className="font-medium text-2xl text-[#646D89] mr-3">
                    {i.toString().length === 1 ? 0 + (i + 1).toString() : i + 1}
                  </span>

                  <span>{lesson.name}</span>

                  <AccordionIcon />
                </AccordionButton>
              </h2>
              {lesson.sub_lessons.map((subLesson, i) => (
                <AccordionPanel
                  pb={4}
                  key={i}
                  className={
                    currentVideo.id === subLesson.sub_lesson_id
                      ? "bg-blue-100"
                      : null
                  }
                >
                  <CircularProgress
                    size="14px"
                    value={findMatchId(subLessonProgress, subLesson)}
                    max="100"
                    thickness={15}
                    className="pb-[3px] mr-[10px]"
                    color="#2FAC8E"
                  />

                  <span
                    role="button"
                    onClick={() =>
                      handleVideo(subLesson.video_url, subLesson.sub_lesson_id)
                    }
                  >
                    {subLesson.name}
                  </span>
                </AccordionPanel>
              ))}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
function CourseVideo({ courseById, currentVideo, handleUpdateSubProgress }) {
  const [playingVideo, setPlayingVideo] = useState({});
  const course = courseById[0];

  useEffect(() => setPlayingVideo(currentVideo), [currentVideo]);

  return (
    <div className="my-[30px]">
      <div className="video-container ml-[15px]">
        <h2 className="font-medium text-4xl mb-[30px]">
          {course.courses.name}
        </h2>
        <video
          width="740"
          height="460"
          key={playingVideo.id}
          onTimeUpdate={(e) => handleUpdateSubProgress(e)}
          controls
        >
          <source src={currentVideo.url} type="video/mp4"></source>
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
              <button className="w-[204px] h-[60px] bg-[#2F5FAC] text-white rounded-lg mt-[20px]">
                Send Assignment
              </button>
              <p className="mt-[45px] text-[#646D89]">Assign within 2 days</p>
            </div>
          </div>
          <p className="absolute top-3 right-4 bg-[#FFFBDB] text-[#996500] p-[5px] rounded-lg">
            Pending
          </p>
        </div>
      </div>
    </div>
  );
}
