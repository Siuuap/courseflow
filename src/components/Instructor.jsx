import { useState, useEffect } from "react";
import Image from "next/image";

function Instructor() {
  return (
    <div className="max-w-[1440px] mx-auto min-2xl:h-[824px]">
      <div className="relative flex gap-5 justify-between items-start max-2xl:flex-wrap my-[105px]">
        <Image
          className="absolute left-[70px] top-[596px] h-[30px] w-[32px]"
          src="/images/instructor-asset.png"
          alt="instructor-asset"
          width={32}
          height={30}
          style={{ objectFit: "cover" }}
          priority={true}
        />
        <div className="flex flex-col flex-1 self-start px-5 max-md:max-w-full">
          <div className="self-center text-4xl font-medium tracking-tighter text-center text-black max-md:max-w-full">
            Our Professional Instructors
          </div>
          <div className="max-w-[1120px] mx-auto">
            <div className="mt-16 max-md:mt-10 max-md:max-w-full">
              <div className="flex max-md:flex-col max-md:gap-0">
                <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col justify-center items-center grow text-center whitespace-nowrap max-md:mt-6">
                    <Image
                      className="image w-[357px] h-[420px] rounded-[8px]"
                      src="/images/profile1.png"
                      width={357}
                      height={420}
                      alt="profile1"
                    />
                    <div className="mt-6 text-2xl font-medium tracking-tight text-black">
                      Jane Cooper
                    </div>
                    <div className="mt-2 text-base leading-6 text-blue-500">
                      UX/UI Designer
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col justify-center items-center grow text-center whitespace-nowrap max-md:mt-6">
                    <Image
                      className="image w-[357px] h-[420px] rounded-[8px]"
                      src="/images/profile2.png"
                      width={357}
                      height={420}
                      alt="profile2"
                    />

                    <div className="mt-6 text-2xl font-medium tracking-tight text-black">
                      Esther Howard
                    </div>
                    <div className="mt-2 text-base leading-6 text-blue-500">
                      Program Manager
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col justify-center items-center grow text-center whitespace-nowrap max-md:mt-6">
                    <Image
                      className="image w-[357px] h-[420px] rounded-[8px]"
                      src="/images/profile3.png"
                      width={357}
                      height={420}
                      alt="profile3"
                    />

                    <div className="mt-6 text-2xl font-medium tracking-tight text-black">
                      Brooklyn Simmons
                    </div>
                    <div className="mt-2 text-base leading-6 text-blue-500">
                      Software Engineer
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Instructor;
