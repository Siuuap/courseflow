"use client";
import axios from "axios";
import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import { useSession } from "next-auth/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
export default function Assignment() {
  const { data: session, status } = useSession();
  console.log(session, status);

  const [course, setCourse] = useState({});
  const [courseSubmitted, setCourseSubmitted] = useState([]);
  const [courseInprogress, setCourseInprogress] = useState([]);
  const [coursePending, setCoursePending] = useState([]);
  const [courseOverdue, setCourseOverdue] = useState({});
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      async function fetchCourse() {
        {
          const res = await axios.get(
            `/api/assignment/?userid=${session?.user?.userId}`
          );
          setCourse(res.data.data);
        }
      }
      fetchCourse();
    }
  }, [session, status]);

  useEffect(() => {
    if (course.length) {
      function courseByStatus() {
        setCoursePending(
          course.filter((course) => {
            return course.status_assignment == 0;
          })
        );
        setCourseInprogress(
          course.filter((course) => {
            return course.status_assignment == 1;
          })
        );

        setCourseSubmitted(
          course.filter((course) => {
            return course.status_assignment == 2;
          })
        );
        setCourseOverdue(
          course.filter((course) => {
            return course.status_assignment == 3;
          })
        );
      }
      courseByStatus();
    }
  }, [course]);
  console.log(courseInprogress, coursePending, courseSubmitted, courseOverdue);

  async function onSubmit(courseId, subId, event) {
    event.preventDefault();
    if (!answer) {
      return alert("Please answer the question before clicking submit...");
    }
    const data = { answer: answer, status: 2 };

    const res = await axios.post(
      `/api/learning/${courseId}/sendassignment/?userid=${session?.user?.userId}&sublessonid=${subId}`,
      data
    );

    let newCourse = course.map((c) => c);

    const newStatus = newCourse.find((courses, i) => {
      if (subId === courses.sub_lesson_id) {
        newCourse[i] = {
          ...courses,
          status_assignment: 2,
          answer: answer,
        };
      }
    });
    setCourse(newStatus);
  }

  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center mt-[100px]">
        <h1 className="text-[36px]">My Assignments</h1>
        <div className="mt-[50px] mb-[150px]">
          <>
            <Tabs>
              <TabList>
                <Tab>All</Tab>
                <Tab>Pending</Tab>
                <Tab>In progress</Tab>
                <Tab>Submitted</Tab>
                <Tab>Overdue</Tab>
              </TabList>

              <TabPanels className="h-[1200px] overflow-y-auto no-scrollbar ">
                {course.length ? (
                  <Panel
                    course={course}
                    answer={answer}
                    setAnswer={setAnswer}
                    onSubmit={onSubmit}
                  />
                ) : (
                  <TabPanel>
                    <h1>You Have 0 Assignment</h1>
                  </TabPanel>
                )}

                {coursePending.length ? (
                  <Panel
                    course={coursePending}
                    answer={answer}
                    setAnswer={setAnswer}
                    onSubmit={onSubmit}
                  />
                ) : (
                  <TabPanel>
                    <h1>You Have 0 Pending Assignment</h1>
                  </TabPanel>
                )}

                {courseInprogress.length ? (
                  <Panel
                    course={courseInprogress}
                    answer={answer}
                    setAnswer={setAnswer}
                    onSubmit={onSubmit}
                  />
                ) : (
                  <TabPanel>
                    <h1>You Have 0 Inprogress Assignment</h1>
                  </TabPanel>
                )}

                {courseSubmitted.length ? (
                  <Panel
                    course={courseSubmitted}
                    answer={answer}
                    setAnswer={setAnswer}
                    onSubmit={onSubmit}
                  />
                ) : (
                  <TabPanel>
                    <h1>You Have 0 Submitted Assignment</h1>
                  </TabPanel>
                )}

                {courseOverdue.length ? (
                  <Panel
                    course={courseOverdue}
                    answer={answer}
                    setAnswer={setAnswer}
                    onSubmit={onSubmit}
                  />
                ) : (
                  <TabPanel className="h-[1200px]">
                    <h1>You Have 0 Overdue Assignment</h1>
                  </TabPanel>
                )}
              </TabPanels>
            </Tabs>
          </>
        </div>
      </div>
      <Footer />
    </>
  );
}

function Panel({ course, answer, setAnswer, onSubmit }) {
  console.log(course);
  return (
    <>
      {course.map((course) => (
        <TabPanel key={course.sub_lesson_id}>
          <form
            onSubmit={(event) =>
              onSubmit(course.course_id, course.sub_lesson_id, event)
            }
            key={course.sub_lesson_id}
          >
            <div className="w-[1120px] h-[354px] bg-[#E5ECF8] px-[96px] py-[40px] rounded-md">
              <div className="pb-[26px] flex flex-row justify-between">
                <div>
                  <h1 className="w-[746px] h-[30px] font-bold">
                    Course: {course.course_name}
                  </h1>
                  <p className="w-[746px] h-[24px] text-[#646D89]">
                    {course.sub_lesson_name}
                  </p>
                </div>
                <div className="w-[155px] h-[64px] flex flex-col items-end justify-between">
                  <StatusAssignmentIcon status={course.status_assignment} />
                  <p>assign within 2 day</p>
                </div>
              </div>
              <div
                className="question-section bg-white w-[928px] h-[172px] p-[26px] rounded-md border flex flex-row"
                key={course.sub_lesson_id}
              >
                <div>
                  <p>{course.question}</p>
                  {course.answer || course.status_assignment == 0 ? (
                    <input
                      placeholder={
                        (course.question && course.answer) ||
                        "Please finish course video first..."
                      }
                      className="w-[720px] h-[96px] border pl-5 "
                      disabled
                      key={course.sub_lesson_id}
                    ></input>
                  ) : (
                    <input
                      placeholder="Answer..."
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      className="w-[720px] h-[96px] border pl-5 "
                      key={course.sub_lesson_id}
                    ></input>
                  )}
                </div>
                <div className="flex flex-col mx-auto mt-[20px] ml-[20px]">
                  {course.status_assignment !== 2 ? (
                    <button
                      className="w-[138px] h-[60px] text-xenter bg-[#2F5FAC] rounded-xl font-bold text-white"
                      type="submit"
                    >
                      Submit
                    </button>
                  ) : null}
                  <button className="w-[138px] h-[60px] text-center font-bold text-[#2F5FAC]">
                    Open in Course
                  </button>
                </div>
              </div>
            </div>
          </form>
        </TabPanel>
      ))}
    </>
  );
}

function StatusAssignmentIcon({ status = 0 }) {
  return (
    <p
      className={
        (status === 0 &&
          "text-[#996500] bg-[#FFFBDB] px-[8px] py-[4px] rounded") ||
        (status === 1 &&
          "text-[#3557CF] bg-[#EBF0FF] px-[8px] py-[4px] rounded") ||
        (status === 2 &&
          "text-[#0A7B60] bg-[#DDF9EF] px-[8px] py-[4px] rounded") ||
        (status === 3 &&
          "text-[#9B2FAC] bg-[#FAE7F4] px-[8px] py-[4px] rounded")
      }
    >
      {(status === 0 && "pending") ||
        (status === 1 && "in progress") ||
        (status === 2 && "Submitted") ||
        (status === 3 && "overdue")}
    </p>
  );
}
