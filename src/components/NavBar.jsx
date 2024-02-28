"use client";
import Button from "./Button";
import ProfileIcon from "@/assets/images/NavBar/ProfileIcon.svg";
import MyCourseIcon from "@/assets/images/NavBar/MyCourseIcon.svg";
import HomeworkIcon from "@/assets/images/NavBar/HomeworkIcon.svg";
import DesireCourseIcon from "@/assets/images/NavBar/DesireCourseIcon.svg";
import LogOutIcon from "@/assets/images/NavBar/LogOutIcon.svg";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  IconButton,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  ChevronDownIcon,
  AddIcon,
  ExternalLinkIcon,
  RepeatIcon,
  EditIcon,
} from "@chakra-ui/icons";

function NavBar() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleLogout = async () => {
    signOut();
  };

  return (
    <div className="shadow-md ">
      <nav className="flex items-center justify-between gap-[40px] min-[1440px]:w-[1440px] min-[1440px]:h-[88px] min-[1440px]:ml-[160px]">
        <Link href="/">
          <Image
            src="/images/iconCourseFlow.png"
            alt="icon-CourseFlow"
            width={140}
            height={16}
          />
        </Link>
        <section className="flex min-[1440px]:items-center min-[1440px]:justify-between min-[1440px]:gap-[40px]">
          <div className="min-[375px]:mt-[20px] min-[375px]:mr-[220px] md:mt-[0px] lg:mr-[450px] text-[#191C77] font-bold text-[16px] leading-6 min-[1440px]:mr-[260px] ">
            <Link href="/course">Our Courses</Link>
          </div>

          <div className="flex md:pl-[0px] min-[1440px]:w-[189px]">
            {status === "unauthenticated" && (
              <Link href="/login">
                <Button className="flex min-[375px]:ml-[70px] min-[375px]:-mt-[20px] min-[375px]:100vw md:-ml-[240px] md:mt-[0px] bg-[#2F5FAC] min-[1440px]:px-8 min-[1440px]:py-[18px] rounded-xl text-base hover:bg-[#5483D0] text-white font-bold text-[16px] leading-6">
                  Login
                </Button>
              </Link>
            )}

            {status === "authenticated" && (
              <div className="flex  flex-row  justify-start items-center gap-[10px]">
                <img
                  src={session.user.url}
                  className=" w-[50px] h-[50px] rounded-[50%]"
                />

                <Menu isLazy>
                  <MenuButton>
                    {session.user.firstName} <ChevronDownIcon />{" "}
                  </MenuButton>
                  <MenuList width={"10px"} minW={"200px"}>
                    {/* MenuItems are not rendered unless Menu is open */}
                    <MenuItem
                      onClick={() => {
                        router.push("/user/edit_profile");
                      }}>
                      <Image src={ProfileIcon} className=" mr-[10px]" />
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        router.push("/user");
                      }}>
                      <Image src={MyCourseIcon} className=" mr-[10px]" />
                      My Courses
                    </MenuItem>
                    <MenuItem>
                      <Image src={HomeworkIcon} className=" mr-[10px]" />
                      My Homework
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        router.push("/user/desire_course");
                      }}>
                      <Image src={DesireCourseIcon} className=" mr-[10px]" />
                      My Desire Courses
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={handleLogout}>
                      <Image src={LogOutIcon} className=" mr-[10px]" />
                      Log out
                    </MenuItem>
                  </MenuList>
                </Menu>
              </div>
            )}
          </div>
        </section>
      </nav>
    </div>
  );
}
export default NavBar;
