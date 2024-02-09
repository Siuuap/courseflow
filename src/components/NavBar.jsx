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

  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    if (status === "authenticated") {
      setUserData({
        ...session.user,
      });
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    signOut();
    setUserData({});
    router.push("/");
  };

  useEffect(() => {
    getUser();
  }, [status]);

  return (
    <div className=" shadow-md">
      <nav className="min-[768px]:flex justify-between items-center mx-[auto] p-[14px] max-w-[1120px] min-[1200px]:px-[0px] h-[88px]">
        <Link href="/">
          <Image
            src="/images/iconCourseFlow.png"
            alt="icon-CourseFlow"
            width={140}
            height={16}
          />
        </Link>
        <section className="flex items-center justify-between gap-[40px]">
          <div className="text-[#191C77] font-bold text-[16px] leading-6">
            <Link href="/course">Our Courses</Link>
          </div>

          <div className="w-[189px]">
            {!loading && status === "unauthenticated" && (
              <Link href="/login">
                <Button className="bg-[#2F5FAC] px-8 py-[18px] rounded-xl text-base hover:bg-[#5483D0] text-white font-bold text-[16px] leading-6">
                  Login
                </Button>
              </Link>
            )}
            {!loading && status === "authenticated" && (
              <div className="flex  flex-row  justify-start items-center gap-[10px]">
                <img
                  src="https://img.freepik.com/photos-premium/image-generee-par-ai-portrait-bel-homme-asiatique_803126-1182.jpg"
                  className=" w-[50px] h-[50px] rounded-[50%]"
                />

                <Menu isLazy>
                  <MenuButton>
                    {userData.firstName} <ChevronDownIcon />{" "}
                  </MenuButton>
                  <MenuList width={"10px"} minW={"200px"}>
                    {/* MenuItems are not rendered unless Menu is open */}
                    <MenuItem>
                      <Image src={ProfileIcon} className=" mr-[10px]" />
                      Profile
                    </MenuItem>
                    <MenuItem>
                      <Image src={MyCourseIcon} className=" mr-[10px]" />
                      My Courses
                    </MenuItem>
                    <MenuItem>
                      <Image src={HomeworkIcon} className=" mr-[10px]" />
                      My Homework
                    </MenuItem>
                    <MenuItem>
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
