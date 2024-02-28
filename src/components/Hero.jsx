import Image from "next/image";
import Button from "./Button";
import Link from "next/link";

function Hero() {
  return (
    <div className="hero relative w-auto min-[1440px]:h-[700px] bg-[#E5ECF8] z-0 min-[375px]:h-[500px]">
      <div className="box-border min-[768px]:flex justify-between items-center mx-[auto] p-[0px] max-w-[1120px] min-[1200px]:px-[0px]">
        <div className="box h-[370px] w-[643px] pt-[165px]">
          <div className="topic min-[375px]:ml-[10px] min-[375px]:text-2xl min-[375px]:-mt-[60px] min-[375px]:w-[250px] lg:w-[643px] lg:text-[66px] lg:font-medium lg:leading-[125%] lg:tracking-[-1.32px]">
            Best Virtual Classroom Software
          </div>
          <div className="content min-[375px]:ml-[10px] min-[375px]:text-base min-[375px]:w-[360px] min-[375px]:pt-[30px] lg:w-[643px] lg:pt-[24px] lg:text-[20px] lg:text-[#646D89] lg:font-normal">
            Welcome to Courseflow! The one-stop online class management system
            that caters to all your educational needs!
          </div>
          <Link href="/course">
            <Button className="button z-50 absolute shadow-[4px 4px 24px 0px rgba(0, 0, 0, 0.08)] bg-[#2F5FAC] hover:bg-blue-400 text-white text-[20px] font-bold py-[18px] px-[32px] mt-[60px] rounded-[12px] min-[375px]:ml-[10px] min-[375px]:text-base">
              Our Courses
            </Button>
          </Link>
        </div>
      </div>

      <Image
        className="absolute min-[1440px]:right-0 min-[1440px]:top-0 min-[1440px]:h-[700px] min-[1440px]:w-[1032px]"
        src="/images/hero-asset1.png"
        alt="hero-asset1"
        width={1032}
        height={700}
        style={{ objectFit: "cover" }}
        priority={true}
      />
      <Image
        className="absolute min-[1440px]:right-[160px] min-[1440px]:top-[151px] min-[1440px]:h-[448px] min-[1440px]:w-[452px]"
        src="/images/hero-asset2.png"
        alt="hero-asset2"
        width={452}
        height={448}
        style={{ objectFit: "cover" }}
        priority={true}
      />
      <Image
        className="absolute min-[1440px]:left-0 min-[1440px]:top-[75.5px] min-[1440px]:h-[549px] min-[1440px]:w-[1389px]"
        src="/images/hero-asset3.png"
        alt="hero-asset3"
        width={1389}
        height={549}
        style={{ objectFit: "cover" }}
        priority={true}
      />
      <Image
        className="absolute min-[1440px]:left-[589px] min-[1440px]:top-[543px] min-[1440px]:h-[26.35px] min-[1440px]:w-[26.35px]"
        src="/images/hero-asset4.png"
        alt="hero-asset1"
        width={26.35}
        height={26.35}
        style={{ objectFit: "cover" }}
        priority={true}
      />
    </div>
  );
}

export default Hero;
