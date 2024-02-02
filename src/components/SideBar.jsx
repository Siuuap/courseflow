import Image from "next/image";
import React from "react";
import CourseFlowIcon from "@/assets/images/CourseFlowIcon.svg";

import CourseIcon from "@/assets/images/CourseIcon.svg";
import TaskIcon from "@/assets/images/TaskIcon.svg";
import LogoutIcon from "@/assets/images/LogoutIcon.svg";

export default function SideBar() {
  return (
    <section className="min-[0px]:hidden min-[1440px]:block border-r border-solid border-[#D6D9E4]  ">
      <div className="flex flex-col items-center p-[24px] pt-[40px] hover:bg-[#F1F2F6] cursor-pointer">
        <Image
          className="mb-[24px] text-[16px] "
          src={CourseFlowIcon}
          alt="course-flow-icon"
          width={`auto`}
          height={`auto`}
        />
        <p className="text-[#646D89] text-[16px]">Admin Panel Control</p>
      </div>
      <div className="flex gap-[16px] w-full py-[16px] px-[24px] hover:bg-[#F1F2F6] cursor-pointer">
        <Image src={CourseIcon} alt="course-icon" width={24} height={24} />
        <div>
          <p>Course</p>
        </div>
      </div>
      <div className="flex gap-[16px] py-[16px] px-[24px] hover:bg-[#F1F2F6] cursor-pointer">
        <Image src={TaskIcon} alt="task-icon" width={24} height={24} />
        <p>Assignment</p>
      </div>
      <div className="flex gap-[16px] py-[16px] px-[24px] hover:bg-[#F1F2F6] cursor-pointer">
        <Image src={LogoutIcon} alt="logout-icon" width={24} height={24} />
        <p>Logout</p>
      </div>
    </section>
  );
}
