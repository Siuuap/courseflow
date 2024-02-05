"use client";
import Button from "./Button";
import UserName from "./UserNameTemp";
import Link from "next/link";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";

function NavBar() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    console.log(status);
    if (status === "authenticated") {
      console.log(session.user);

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
    <nav className="min-[768px]:flex justify-between items-center mx-[auto] p-[14px] max-w-[1120px] min-[1200px]:px-[0px] h-[100px]">
      <section>
        <p>CourseFlow</p>
      </section>
      <section className="flex items-center justify-between gap-[56px]">
        <a className="text-[#191C77]">Our Course</a>

        <div className="w-[189px]">
          {!loading && status === "unauthenticated" && (
            <Link href="/login">
              <Button className="bg-[#2F5FAC] px-8 py-[18px] rounded-xl text-base hover:bg-[#5483D0] text-white">
                Login
              </Button>
            </Link>
          )}

          <div onClick={() => handleLogout()}>
            {!loading && status === "authenticated" && (
              <UserName className="">{userData.firstName}</UserName>
            )}
          </div>
        </div>
      </section>
    </nav>
  );
}
export default NavBar;
