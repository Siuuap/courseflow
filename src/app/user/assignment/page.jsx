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
      <div>
        <h1>My Assignments</h1>
        <div>
          <Tabs>
            <TabList>
              <Tab>All</Tab>
              <Tab>Pending</Tab>
              <Tab>In progress</Tab>
              <Tab>Submitted</Tab>
              <Tab>Overdue</Tab>

              <TabPanels></TabPanels>
            </TabList>
          </Tabs>
        </div>
      </div>
    </>
  );
}
