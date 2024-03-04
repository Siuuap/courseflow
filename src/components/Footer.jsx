import Link from "next/link";
import Image from "next/image";

function Footer() {
  return (
    <div className="flex justify-center items-center px-16 py-12 bg-[#183056] max-md:px-5 h-[240px]">
      <div className="flex gap-5 justify-between items-center pl-2 mt-0.5 ml-1 w-full max-w-[1120px] max-md:flex-wrap max-md:mt-10 max-md:max-w-full max-sm:mt-3.5">
        <Link href="/">
          <Image
            loading="lazy"
            src="/images/iconCourseFlow.png"
            alt="icon-CourseFlow"
            width={140}
            height={16}
            className="self-stretch my-auto max-w-full w-[140px] max-sm:ml-20 flex justify-center items-center"
          />
        </Link>

        <div className="flex flex-1 justify-center items-center self-stretch px-16 my-auto text-base leading-6 text-slate-300 max-md:px-5 max-md:max-w-full">
          <div className="flex gap-5 justify-between max-sm:-ml-1">
            <Link href="/ourcourse" className="flex-auto text-center">
              All Courses
            </Link>
            <div className="flex-auto text-center">Bundle Package</div>
          </div>
        </div>
        <div className="flex gap-4 justify-center items-center self-stretch max-sm:ml-16">
          <div className="flex justify-center items-center px-3">
            <Link href="https://www.facebook.com/">
              <Image
                loading="lazy"
                className="image w-[48px] h-[48px]"
                src="/images/fb.png"
                alt="fb"
                width={48}
                height={48}
              />
            </Link>
          </div>
          <div className="flex justify-center items-center px-3">
            <Link href="https://www.instagram.com/">
              <Image
                loading="lazy"
                className="image w-[48px] h-[48px]"
                src="/images/ig.png"
                alt="ig"
                width={48}
                height={48}
              />
            </Link>
          </div>
          <div className="flex justify-center items-center px-3">
            <Link href="https://twitter.com/">
              <Image
                loading="lazy"
                className="image w-[48px] h-[48px]"
                src="/images/tw.png"
                alt="tw"
                width={48}
                height={48}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
