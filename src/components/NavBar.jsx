"use client";
import Button from "./Button";
import ProfileIcon from "@/assets/images/NavBar/ProfileIcon.svg";
import MyCourseIcon from "@/assets/images/NavBar/MyCourseIcon.svg";
import HomeworkIcon from "@/assets/images/NavBar/HomeworkIcon.svg";
import DesireCourseIcon from "@/assets/images/NavBar/DesireCourseIcon.svg";
import LogOutIcon from "@/assets/images/NavBar/LogOutIcon.svg";
import LoadingPage from "./LoadingPage";
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
  const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  //   if (status) {
  //     setIsLoading(false);
  //   }
  // }, []);
  console.log(`status`, status);
  return (
    <>
      {status === "loading" ? (
        <LoadingPage />
      ) : (
        <div className="max-w-[1440px] mx-auto ">
          <div className="">
            <nav className="flex justify-between items-center px-[160px] text-base font-bold leading-6 text-center bg-white shadow-sm max-md:px-5 h-[92px]">
              <div className="flex justify-between ">
                <Link href="/" className="xs:w-[140px]">
                  <Image
                    src="/images/iconCourseFlow.png"
                    alt="icon-CourseFlow"
                    width={140}
                    height={16}
                  />
                </Link>
              </div>
              <div className="flex justify-between py-3.5 xs:w-[260px]">
                <div className="my-auto text-[#191C77] ">
                  <Link
                    href="/course"
                    className="min-[375px]:text-[10px] md:text-[16px]"
                  >
                    Our Courses
                  </Link>
                </div>
                {status === "unauthenticated" && (
                  <Link href="/login">
                    <Button className="bg-[#2F5FAC] px-8 py-[18px] rounded-xl text-base hover:bg-[#5483D0] text-white font-bold text-[16px] leading-6">
                      Login
                    </Button>
                  </Link>
                )}

                {status === "authenticated" && (
                  <div className="flex flex-row justify-start items-center gap-[10px]">
                    <img
                      src={session.user.url}
                      alt="user profile icon"
                      className=" w-[50px] h-[50px] rounded-[50%]"
                    />

                    <Menu isLazy>
                      <MenuButton>
                        {session.user.firstName} <ChevronDownIcon />{" "}
                      </MenuButton>
                      <MenuList
                        width={"10px"}
                        minW={"200px"}
                        className="font-normal"
                      >
                        {/* MenuItems are not rendered unless Menu is open */}
                        <MenuItem
                          onClick={() => {
                            router.push("/user/edit_profile");
                          }}
                        >
                          <Image
                            src={ProfileIcon}
                            alt="profile icon"
                            className="mr-[10px]"
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
                            alt="course icon"
                            className="mr-[10px]"
                          />
                          My Courses
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            router.push("/user/assignment");
                          }}
                        >
                          <Image
                            src={HomeworkIcon}
                            alt="homework icon"
                            className="mr-[10px]"
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
                            alt="desired icon"
                          />
                          My Desire Courses
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem onClick={handleLogout}>
                          <Image
                            src={LogOutIcon}
                            alt="log out icon"
                            className="mr-[10px]"
                          />
                          Log out
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
export default NavBar;
