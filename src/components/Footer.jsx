//import iconCourseFlow from "../../public/images/iconCourseFlow.png";
import Link from "next/link";
import Image from "next/image";

function Footer() {
  return (
    <div className="footer bg-[#183056] h-[240px]">
      <nav className="py-[96px] min-[768px]:flex justify-between items-center mx-[auto] p-[14px] max-w-[1120px] min-[1200px]:px-[0px]">
        <Link href="/">
          <Image
            src="/images/iconCourseFlow.png"
            alt="icon-CourseFlow"
            width={140}
            height={16}
          />
        </Link>
        <div className="flex items-center justify-between gap-[96px]">
          <div className="text-[#C8CCDB] font-normal text-[16px] leading-6">
            <Link href="/ourcourse">All Courses</Link>
          </div>
          <div className="text-[#C8CCDB] font-normal text-[16px] leading-6">
            Bundle Package
          </div>
        </div>
        <div className="flex items-center justify-between gap-[16px]">
          <Link href="https://www.facebook.com/">
            <Image
              className="image w-[48px] h-[48px] rounded-[8px]"
              src="/images/fb.png"
              alt="fb"
              width={48}
              height={48}
            />
          </Link>
          <Link href="https://www.instagram.com/">
            <Image
              className="image w-[48px] h-[48px] rounded-[8px]"
              src="/images/ig.png"
              alt="ig"
              width={48}
              height={48}
            />
          </Link>
          <Link href="https://twitter.com/">
            <Image
              className="image w-[48px] h-[48px] rounded-[8px]"
              src="/images/tw.png"
              alt="tw"
              width={48}
              height={48}
            ></Image>
          </Link>
        </div>
      </nav>
    </div>
  );
}
export default Footer;
