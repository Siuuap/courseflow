"use client";
import React from "react";
import SideBar from "@/components/SideBar";
import Assignmentmodal from "@/components/Assignmentmodal"


export default function page() {
  return (
    <div>
      <SideBar />
      <p>This is assignment page</p>
      <Assignmentmodal/>
    </div>
  );
}
