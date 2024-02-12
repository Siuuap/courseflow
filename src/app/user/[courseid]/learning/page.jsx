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

export default function Learning({ params }) {
  const [login, setLogin] = useState(true);
  const [courseById, setCourseById] = useState([]);
  const [currentVideo, setCurrentVideo] = useState({});
  const [isLoading, setIsloading] = useState(false);

  const [subLessonProgress, setSubLessonProgress] = useState([]);

  function handleVideo(url, id) {
    setCurrentVideo({ url, id });
  }
  console.log(subLessonProgress);
  console.log(currentVideo);

  useEffect(() => {
    async function fetchCourseById() {
      const courseId = params.courseid;
      console.log(courseId);
      const res = await axios.get(`/api/view/${courseId}`);

      setCourseById(res.data.data);
      setSubLessonProgress(res.data.data[0].users_sub_lessons);
      setIsloading(true);
    }
    fetchCourseById();
  }, [params.courseid]);

  function handleUpdateSubProgress(e) {
    const currentSubProgress = (e.target.currentTime / e.target.duration) * 100;

    let newSublessonProgress = subLessonProgress.map((arr) => arr);
    console.log(newSublessonProgress);

    const newProgress = newSublessonProgress.find((o, i) => {
      if (
        (o.sub_lesson_id === currentVideo.id &&
          currentSubProgress - 20 >= o.status) ||
        100
      ) {
        newSublessonProgress[i] = { status: currentSubProgress };
        return true;
      }
    });
    console.log(newProgress);
    console.log(newSublessonProgress);
    setSubLessonProgress(newSublessonProgress);
    // courseById[0].users_sub_lessons.map((sub) => {
    //   if (currentVideo.id === sub.sub_lesson_id) {
    //     console.log(sub);
    //     return sub;
    //  }
    // });

    // if (currentSubProgress - 20 >= currentSubLesson[0].status || 100) {
    //   const newProgress = subLessonProgress.map((sub) => {
    //     if (sub.sub_lesson_id === currentSubLesson[0].sub_lesson_id) {
    //       sub.status = currentSubProgress;
    //     }
    //   });
  }

  console.log(currentVideo);

  return (
    <>
      <NavBar />
      <div className="page-container w-[1440px] flex justify-items-center mx-auto">
        {isLoading && subLessonProgress && (
          <LessonAccordion
            courseById={courseById}
            handleVideo={handleVideo}
            subLessonProgress={subLessonProgress}
          />
        )}
        {isLoading == true && (
          <CourseVideo
            courseById={courseById}
            currentVideo={currentVideo}
            handleUpdateSubProgress={handleUpdateSubProgress}
          />
        )}
      </div>
      <Footer />
    </>
  );
}

function LessonAccordion({ courseById, handleVideo, subLessonProgress }) {
  const course = courseById[0];
  const [progress, setProgress] = useState(50);

  console.log(subLessonProgress);
  console.log(course);

  return (
    <div className="shadow-[0px_5px_5px_0px_rgba(100,109,137,1)] rounded-md px-[24px] py-[32px]">
      <div className="Course-progress-container w-[358px]  ">
        <p className="text-[#F47E20] leading-[21px] mb-[26px]">Course</p>
        <div className="w-[310px] h-[86px]">
          <h1 className="text-bold w-[310px] h-[30px]">
            {course.courses.name}
          </h1>
          <p>{course.courses.description.slice(0, 50)}</p>
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
          {course.courses.lessons.map((lesson, i) => (
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
                    value={subLessonProgress[i].status}
                    max="100"
                    thickness={15}
                    className="pb-[3px] mr-[10px]"
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

  console.log(playingVideo);

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
          <source
            src={
              !playingVideo.url
                ? course.courses.lessons[0].sub_lessons[0].video_url
                : playingVideo.url
            }
            // src="https://inhlygnonkpslheuiypd.supabase.co/storage/v1/object/public/courseintrovideo/exam_video%20(online-video-cutter.com).mp4?t=2024-02-06T17%3A04%3A04.843Z"
            type="video/mp4"
          >
            {console.log(currentVideo)}
          </source>
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
