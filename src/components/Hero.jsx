import Image from "next/image";
import Button from "./Button";
import Link from "next/link";

function Hero() {
  return (
    <div className="hero relative w-auto h-[700px] bg-[#E5ECF8] z-0">
      <div className="box-border min-[768px]:flex justify-between items-center mx-[auto] p-[0px] max-w-[1120px] min-[1200px]:px-[0px]">
        <div className="box h-[370px] w-[643px] pt-[165px]">
          <div className="topic w-[643px] text-[66px] font-medium leading-[125%] tracking-[-1.32px]">
            Best Virtual Classroom Software
          </div>
          <div className="content w-[643px] pt-[24px] text-[20px] text-[#646D89] font-normal">
            Welcome to Schooler! The one-stop online class management system
            that caters to all your educational needs!
          </div>
          <Link href="/ourcourse">
            <Button className="button z-50 absolute shadow-[4px 4px 24px 0px rgba(0, 0, 0, 0.08)] bg-[#2F5FAC] hover:bg-blue-400 text-white text-[20px] font-bold py-[18px] px-[32px] mt-[60px] rounded-[12px]">
              Our Courses
            </Button>
          </Link>
        </div>
      </div>

      <Image
        className="absolute right-0 top-0 h-[700px] w-[1032px]"
        src="/images/hero-asset1.png"
        alt="hero-asset1"
        width={1032}
        height={700}
        style={{ objectFit: "cover" }}
        priority={true}
      />
      <Image
        className="absolute right-[160px] top-[151px] h-[448px] w-[452px]"
        src="/images/hero-asset2.png"
        alt="hero-asset2"
        width={452}
        height={448}
        style={{ objectFit: "cover" }}
        priority={true}
      />
      <Image
        className="absolute left-0 top-[75.5px] h-[549px] w-[1389px]"
        src="/images/hero-asset3.png"
        alt="hero-asset3"
        width={1389}
        height={549}
        style={{ objectFit: "cover" }}
        priority={true}
      />
      <Image
        className="absolute left-[589px] top-[543px] h-[26.35px] w-[26.35px]"
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
