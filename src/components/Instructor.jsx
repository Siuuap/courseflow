import { useState, useEffect } from "react";
import Image from "next/image";

function Instructor() {
  return (
    <div className="feature relative h-[823px] bg-[#FFF] flex items-center justify-center">
      <div className="box-border h-[611px] w-[1120px] ">
        <div className="topic flex items-center justify-center text-[36px] font-medium leading-[125%] tracking-[-0.72px]">
          Our Professional Instructors
        </div>

        <div className="box-profile flex flex-row h-[566px] pt-[60px]">
          <div className="profile1 w-[357px] h-[506px] flex flex-col items-center justify-center">
            <div className="box-img h-[420px]"></div>
            <Image
              className="image w-[357px] h-[420px] rounded-[8px]"
              src="/images/profile1.png"
              width={357}
              height={420}
              alt="profile1"
            />
            <div className="name pt-[24px] text-[24px] font-medium leading-[125%] tracking-[-0.48px]">
              Jane Cooper
            </div>
            <div className="position pt-[8px] text-[#5483D0] text-[16px] font-normal leading-[150%]">
              UX/UI Designer
            </div>
          </div>

          <div className="profile2 pl-[24px] w-[381px] h-[506px] flex flex-col items-center justify-center">
            <div className="box-img h-[420px]"></div>
            <Image
              className="image w-[357px] h-[420px] rounded-[8px]"
              src="/images/profile2.png"
              width={357}
              height={420}
              alt="profile2"
            />
            <div className="name pt-[24px] text-[24px] font-medium leading-[125%] tracking-[-0.48px]">
              Esther Howard
            </div>
            <div className="position pt-[8px] text-[#5483D0] text-[16px] font-normal leading-[150%]">
              Program Manager
            </div>
          </div>

          <div className="profile3 pl-[24px] w-[381px] h-[506px] flex flex-col items-center justify-center">
            <div className="box-img h-[420px]"></div>
            <Image
              className="image w-[357px] h-[420px] rounded-[8px]"
              src="/images/profile3.png"
              width={357}
              height={420}
              alt="profile3"
            />
            <div className="name pt-[24px] text-[24px] font-medium leading-[125%] tracking-[-0.48px]">
              Brooklyn Simmons
            </div>
            <div className="position pt-[8px] text-[#5483D0] text-[16px] font-normal leading-[150%]">
              Software Engineer
            </div>
          </div>
        </div>
      </div>

      <Image
        className="absolute left-[70px] top-[696px] h-[30px] w-[32px]"
        src="/images/instructor-asset.png"
        alt="instructor-asset"
        width={32}
        height={30}
        style={{ objectFit: "cover" }}
        priority={true}
      />
    </div>
  );
}

export default Instructor;
