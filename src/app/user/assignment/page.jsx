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

  useEffect(
    () =>
      async function fetchCourse() {
        if (status === "authenticated") {
          const res = await axios.get(
            `/api/assignment/?userid=${session?.user?.userId}`
          );
          setCourse(res.data.data);
          console.log(res.data.data);
        }
      },
    [session, status]
  );

  console.log(course);
  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center">
        <h1>My Assignments</h1>

        <div>
          <>
            <Tabs>
              <TabList>
                <Tab>All</Tab>
                <Tab>Pending</Tab>
                <Tab>In progress</Tab>
                <Tab>Submitted</Tab>
                <Tab>Overdue</Tab>
              </TabList>
              <TabPanels>
                {/* {course && <Panel course={course} />} */}

                <TabPanel>
                  {/* <Panel course={course} /> */}
                  <p>2</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </>
        </div>
      </div>
    </>
  );
}

function Panel({ course }) {
  const courses = course;
  console.log(courses);
  return (
    <>
      {courses?.map((course) => (
        <TabPanel key={course.course_name}>
          <div className="w-[1120px] h-[354px] bg-[#E5ECF8]">
            <h1>Course: {course.course_name}</h1>
            <p>Introduction</p>
            <div className="question-section bg-white w-[928px] h-[172px]">
              <p>{course.question}</p>
              <input
                placeholder="Answer..."
                className="w-[720px] h-[96px]"
              ></input>
            </div>
          </div>
        </TabPanel>
      ))}
    </>
  );
}
