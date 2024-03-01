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
    <div className="shadow-md">
      <nav className="flex justify-center items-center px-16 text-base font-bold leading-6 text-center bg-white shadow-sm max-md:px-5">
        <div className="flex gap-5 justify-between w-full max-w-[1120px] max-md:flex-wrap max-md:max-w-full">
          <Link href="/">
            <Image
              src="/images/iconCourseFlow.png"
              alt="icon-CourseFlow"
              width={140}
              height={16}
              className="h-auto max-w-lg"
            />
          </Link>
        </div>
        <ul className="flex gap-5 justify-between py-3.5 pl-6">
          <li className="my-auto text-violet-950">
            <Link href="/course">Our Courses</Link>
          </li>

          <li>
            {status === "unauthenticated" && (
              <Link href="/login">
                <Button className=" justify-center px-8 py-5 text-white whitespace-nowrap bg-blue-800 rounded-xl shadow-lg max-md:px-5">
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
                      }}
                    >
                      <Image
                        src={ProfileIcon}
                        className=" mr-[10px]"
                        alt="ProfileIcon"
                      />
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        router.push("/user");
                      }}
                    >
                      <Image
                        src={MyCourseIcon}
                        className=" mr-[10px]"
                        alt="MyCourseIcon"
                      />
                      My Courses
                    </MenuItem>
                    <MenuItem>
                      <Image
                        src={HomeworkIcon}
                        className=" mr-[10px]"
                        alt="HomeworkIcon"
                      />
                      My Homework
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        router.push("/user/desire_course");
                      }}
                    >
                      <Image
                        src={DesireCourseIcon}
                        className=" mr-[10px]"
                        alt="DesireCourseIcon"
                      />
                      My Desire Courses
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={handleLogout}>
                      <Image
                        src={LogOutIcon}
                        className=" mr-[10px]"
                        alt="LogOutIcon"
                      />
                      Log out
                    </MenuItem>
                  </MenuList>
                </Menu>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default NavBar;
