"use client";
import Button from "./Button";
import UserName from "./UserNameTemp";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function NavBar() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getUser = async () => {
    const result = await axios.get("http://localhost:3000/api/data");
    setLoading(false);
    setUserData(result.data);

    // console.log(loading);
    // console.log(userData);
  };

  const handleLogout = async () => {
    const result = await axios.post("http://localhost:3000/api/auth/logout");
    // console.log(userData);
    setUserData({});
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <nav className="min-[768px]:flex justify-between items-center mx-[auto] p-[14px] max-w-[1120px] min-[1200px]:px-[0px] h-[100px]">
      <section>
        <p>CourseFlow</p>
      </section>
      <section className="flex items-center justify-between gap-[56px]">
        <a className="text-[#191C77]">Our Course</a>

        <div className="w-[189px]">
          {!userData.email && !loading && (
            <Link href="/login">
              <Button className="bg-[#2F5FAC] px-8 py-[18px] rounded-xl text-base hover:bg-[#5483D0] text-white">
                Login
              </Button>
            </Link>
          )}

          <div onClick={() => handleLogout()}>
            {!loading && <UserName className="">{userData.firstName}</UserName>}
          </div>
        </div>
      </section>
    </nav>
  );
}
export default NavBar;
