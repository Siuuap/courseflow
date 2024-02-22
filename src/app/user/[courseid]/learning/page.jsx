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

export default function Learning({ params }) {
  const { data: session, status } = useSession();
  const [courseById, setCourseById] = useState([]);
  const [currentSubLesson, setcurrentSubLesson] = useState({});
  const [isLoading, setIsloading] = useState(false);
  const [subLessonProgress, setSubLessonProgress] = useState([]);
  const [progress, setProgress] = useState(0);
  const [allSubLesson, setAllSubLesson] = useState({});
  const [assignmentStatus, setAssignmentStatus] = useState([]);

  console.log("subProgress", subLessonProgress);

  useEffect(() => {
    function sumProgress() {
      const progressPercentage = subLessonProgress.map((sub) => sub.status);
      const sumProgress =
        progressPercentage.reduce(function (acc, cur) {
          return acc + cur;
        }, 0) / progressPercentage.length;

      setProgress(Math.round(sumProgress));
    }
    sumProgress();
  }, [subLessonProgress]);

  function handleSubLesson(subLesson, index) {
    setcurrentSubLesson(subLesson);
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

        setSubLessonProgress(res?.data?.data[0]?.users_sub_lessons);
        setcurrentSubLesson(res.data.data[0].courses.lessons[0].sub_lessons[0]);
        setIsloading(true);
        setAllSubLesson(
          res.data.data[0].courses.lessons.map((lesson) => lesson.sub_lessons)
        );
        setAssignmentStatus(res.data.data[0].users_sub_lessons);
      }
    }
    fetchCourseById();
  }, [status]);

  function handleUpdateSubProgress(e) {
    let currentSubProgress = (e.target.currentTime / e.target.duration) * 100;
    if (currentSubProgress >= 80) {
      currentSubProgress = 100;
      async function updateAssignmentStatus() {
        const data = { status: 1 };
        const courseId = params.courseid;
        const res = await axios.post(
          `/api/learning/${courseId}/sendassignment/?userid=${session?.user?.userId}&sublessonid=${currentSubLesson.sub_lesson_id}`,
          data
        );

        const newAssignmentStatus = assignmentStatus.map(
          (assignment) => assignment
        );
        newAssignmentStatus.find((assignment, i) => {
          if (assignment.sub_lesson_id === assignment.sub_lesson_id) {
            newAssignmentStatus[i] = { ...assignment, status_assignment: 1 };
          }
        });
        setAssignmentStatus(newAssignmentStatus);
      }
      updateAssignmentStatus();
    }

    let newSublessonProgress = subLessonProgress.map((arr) => arr);

    const newProgress = newSublessonProgress.find((object, i) => {
      if (
        object.sub_lesson_id === currentSubLesson.sub_lesson_id &&
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

  function handleButton(current) {
    if (allSubLesson) {
      const allSub = [].concat.apply([], allSubLesson);

      let index;
      allSub.forEach((id, i) => {
        if (id.sub_lesson_id == currentSubLesson.sub_lesson_id) {
          index = i;
        }
      });
      const result = index + current;

      result >= 0 && result < allSub.length
        ? setcurrentSubLesson(allSub[result])
        : null;
    }
  }

  return (
    <>
      <NavBar />
      <div className="page-container w-[1440px] flex justify-items-center mx-auto mt-[80px] mb-[10px]">
        {isLoading && subLessonProgress && currentSubLesson && (
          <LessonAccordion
            courseById={courseById}
            handleSubLesson={handleSubLesson}
            subLessonProgress={subLessonProgress}
            progress={progress}
            currentSubLesson={currentSubLesson}
          />
        )}
        {isLoading == true && currentSubLesson && (
          <CourseVideo
            courseById={courseById}
            currentSubLesson={currentSubLesson}
            handleUpdateSubProgress={handleUpdateSubProgress}
            session={session}
            params={params}
            subLessonProgress={setSubLessonProgress}
            assignmentStatus={assignmentStatus}
            setAssignmentStatus={setAssignmentStatus}
            key={currentSubLesson.sub_lesson_id}
          />
        )}
      </div>
      <div className="btn-container flex flex-row justify-between w-[1440px] h-[100px] mx-[150px] ">
        <button
          className="text-[#2F5FAC] font-bold w-[162px] h-[60px]"
          onClick={() => handleButton(-1)}
        >
          Previous Lesson
        </button>
        <button
          className="bg-[#2F5FAC] text-white font-bold w-[162px] h-[60px] rounded-lg"
          onClick={() => handleButton(1)}
        >
          Next Lesson
        </button>
      </div>
      <Footer />
    </>
  );
}

function LessonAccordion({
  courseById,
  handleSubLesson,
  subLessonProgress,
  progress,
  currentSubLesson,
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
                    currentSubLesson.sub_lesson_id === subLesson.sub_lesson_id
                      ? "bg-blue-100 rounded-md"
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
                    onClick={() => handleSubLesson(subLesson)}
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
function CourseVideo({
  courseById,
  currentSubLesson,
  handleUpdateSubProgress,
  session,
  params,
  assignmentStatus,
  setAssignmentStatus,
}) {
  const course = courseById[0];
  const [assignment, setAssignment] = useState({});
  const [answer, setAnswer] = useState("");

  console.log("currentsub", currentSubLesson);
  console.log("assignment", assignment);
  console.log("assStatus", assignmentStatus);

  useEffect(() => {
    function status() {
      const assignment = assignmentStatus.find((sub) => {
        if (sub.sub_lesson_id === currentSubLesson.sub_lesson_id) {
          setAssignment(sub);
        }
      });
    }

    if (assignmentStatus) status();
  }, [currentSubLesson, assignmentStatus]);

  async function onSubmit(e) {
    e.preventDefault();
    if (answer == "") {
      return alert("Please answer the question before clicking send...");
    }
    const courseId = params.courseid;
    const data = { answer: answer, status: 2 };

    const res = await axios.post(
      `/api/learning/${courseId}/sendassignment/?userid=${session?.user?.userId}&sublessonid=${currentSubLesson.sub_lesson_id}`,
      data
    );

    let newAssignmentStatus = assignmentStatus.map((assignment) => assignment);

    const newStatus = newAssignmentStatus.find((sub, i) => {
      if (sub.sub_lesson_id === currentSubLesson.sub_lesson_id) {
        newAssignmentStatus[i] = {
          ...sub,
          status_assignment: 2,
          answer: answer,
        };
      }
    });
    setAssignmentStatus(newAssignmentStatus);
  }

  return (
    <div className="my-[30px]">
      <div className="video-container ml-[15px]">
        <h2 className="font-medium text-4xl mb-[30px]">
          {course.courses.name}
        </h2>
        <video
          width="740"
          height="460"
          key={currentSubLesson.name}
          onTimeUpdate={(e) => handleUpdateSubProgress(e)}
          controls
        >
          <source src={currentSubLesson.video_url} type="video/mp4"></source>
        </video>
        <div className="assignment-section mt-[50px] bg-[#E5ECF8] p-[15px] rounded-md relative">
          <form onSubmit={onSubmit} key={currentSubLesson.name}>
            {currentSubLesson.assignments.question ? (
              <>
                <div className="assignment-container flex flex-col items-start ">
                  <h2>Assignment</h2>
                  <p>{currentSubLesson.assignments.question}</p>
                  {assignment.answer ? (
                    <div className="mt-[20px]">
                      <p>your Answer :</p>
                      <p>{assignment.answer}</p>
                    </div>
                  ) : (
                    <input
                      placeholder="Answer..."
                      className="w-[692px] h-[96px] rounded-md mt-[20px]"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                    ></input>
                  )}
                  {assignment.status_assignment === 2 ? null : (
                    <div className="send-assignment flex flex-row justify-between w-[710px]">
                      <button
                        className="w-[204px] h-[60px] bg-[#2F5FAC] text-white rounded-lg mt-[20px]"
                        type="submit"
                      >
                        Send Assignment
                      </button>

                      <p className="mt-[45px] text-[#646D89]">
                        Assign within 2 days
                      </p>
                    </div>
                  )}
                </div>
                <p
                  className="absolute top-3 right-4 bg-[#FFFBDB] text-[#996500] p-[5px] rounded-lg"
                  key={currentSubLesson.name}
                >
                  {(assignment.status_assignment == 0 && "pending") ||
                    (assignment.status_assignment == 1 && "in progress") ||
                    (assignment.status_assignment == 2 && "submitted") ||
                    (assignment.status_assignment == 3 && "overdue")}
                </p>
              </>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}
