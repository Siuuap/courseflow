import Image from "next/image";
import React from "react";
import CourseFlowIcon from "@/assets/images/CourseFlowIcon.svg";

import CourseIcon from "@/assets/images/CourseIcon.svg";
import TaskIcon from "@/assets/images/TaskIcon.svg";
import LogoutIcon from "@/assets/images/LogoutIcon.svg";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
export default function SideBar({ setIsLoading }) {
  return (
    <section className="border border-solid border-[#F6F7FC] border-r-[#D6D9E4] h-screen fixed bg-[#fff] w-[240px] ">
      <div className="flex flex-col items-center p-[24px] pt-[40px]">
        <Link href="/admin/courselist">
          <Image
            className="mb-[24px] text-[16px]"
            src={CourseFlowIcon}
            alt="course-flow-icon"
            width={`auto`}
            height={`auto`}
          />
        </Link>

        <p className="text-[#646D89] text-[16px]">Admin Panel Control</p>
      </div>

      <Link href="/admin/courselist">
        <div className="flex gap-[16px] w-full py-[16px] px-[24px] hover:bg-[#F1F2F6] cursor-pointer">
          <Image src={CourseIcon} alt="course-icon" width={24} height={24} />
          <div>
            <p>Course</p>
          </div>
        </div>
      </Link>

      <Link href="/admin/assignment">
        <div className="flex gap-[16px] py-[16px] px-[24px] hover:bg-[#F1F2F6] cursor-pointer mb-[284px]">
          <Image src={TaskIcon} alt="task-icon" width={24} height={24} />
          <p>Assignment</p>
        </div>
      </Link>

      <div
        className="flex gap-[16px] py-[16px] px-[24px] hover:bg-[#F1F2F6] cursor-pointer"
        onClick={() => {
          setIsLoading(true);
          signOut();
        }}
      >
        <Image src={LogoutIcon} alt="logout-icon" width={24} height={24} />
        <p>Logout</p>
      </div>
    </section>
  );
}
