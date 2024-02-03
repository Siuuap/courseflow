import Button from "./Button";
import Image from "next/image";
import Link from "next/link";

function NavBar() {
  return (
    <nav className="min-[768px]:flex justify-between items-center mx-[auto] p-[14px] max-w-[1120px] min-[1200px]:px-[0px]">
      <Link href="/">
        <Image
          src="/images/iconCourseFlow.png"
          alt="icon-CourseFlow"
          width={140}
          height={16}
        />
      </Link>
      <section className="flex items-center justify-between gap-[56px]">
        <div className="text-[#191C77] font-bold text-[16px] leading-6">
          <Link href="/ourcourse">Our Courses</Link>
        </div>
        <Button className="bg-[#2F5FAC] px-8 py-[18px] rounded-xl text-base hover:bg-[#5483D0] text-white font-bold text-[16px] leading-6">
          <Link href="/login">Login</Link>
        </Button>
      </section>
    </nav>
  );
}
export default NavBar;
