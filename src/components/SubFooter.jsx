import Button from "./Button";
import Image from "next/image";
import Link from "next/link";

function SubFooter() {
  return (
    <div className=" bg-gradient-to-r from-[#2558DD] to-[#5697FF]">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex gap-5 justify-between px-20 pt-12 max-2xl:flex-wrap min-2xl:px-10">
          <div className="flex flex-col flex-1 my-auto ml-20 max-md:max-w-full">
            <div className="text-4xl font-medium tracking-tighter text-white max-md:max-w-full">
              Want to start learning?
            </div>
            <div className="justify-center self-start px-8 py-5 mt-11 text-base font-bold leading-6 text-center text-[#F47E20] whitespace-nowrap bg-white rounded-xl border border-solid shadow-lg border-[#F47E20] max-md:px-5 max-md:mt-10">
              <Button className="text-base hover:underline font-bold text-[16px] leading-6">
                <Link href="/register">Register</Link>
              </Button>
            </div>
            <div className="self-end mt-32 mr-5 rounded-full h-[26px] stroke-[3px] w-[26px] max-md:mt-10 max-md:mr-2.5" />
          </div>
          <img
            loading="lazy"
            src="/images/subfooter-asset1.png"
            className="flex-1 w-full aspect-[1.32] max-md:max-w-full"
          />
          <img
            loading="lazy"
            src="https://shorturl.at/ktAK0"
            className="self-start mt-20 aspect-square stroke-[2px] stroke-white w-[35px] max-md:mt-10"
          />
        </div>
      </div>
    </div>
  );
}
export default SubFooter;
