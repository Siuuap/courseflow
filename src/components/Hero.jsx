import Image from "next/image";
import Button from "./Button";
import Link from "next/link";

function Hero() {
  return (
    <div className="relative bg-[#E5ECF8] z-0">
      <div className="max-w-[1440px] mx-auto h-[700px]">
        <div className="flex gap-5 justify-between items-start py-12 max-md:flex-wrap max-md:pr-5 border-10">
          <div className="flex gap-5 justify-between self-end mt-24 max-md:flex-wrap max-md:mt-10 max-md:max-w-full max-sm:mt-1.5 2xl:px-[160px]">
            <div className="flex flex-col flex-1 self-start max-md:max-w-full ">
              <div className="text-7xl font-medium tracking-tighter text-black leading-[83px] max-sm:text-2xl max-md:max-w-full max-md:text-4xl max-xl:text-5xl max-md:leading-[56px] max-2xl:text-7xl max-w-[643px]">
                Best Virtual Classroom Software
              </div>
              <div className="mt-6 text-xl leading-8 text-slate-500 max-md:max-w-full max-w-[643px] max-sm:text-base">
                Welcome to Schooler! The one-stop online class management system
                that caters to all your educational needs!{" "}
              </div>
              <Link href="/course">
                <Button className="button z-50 absolute shadow-[4px 4px 24px 0px rgba(0, 0, 0, 0.08)] bg-[#2F5FAC] hover:bg-blue-400 text-white text-[20px] font-bold py-[18px] px-[32px] mt-[60px] rounded-[12px] min-[375px]:text-base">
                  Our Courses
                </Button>
              </Link>

              <div className="self-end mt-2 mr-48 rounded-full h-[26px] stroke-[3px] w-[26px] max-md:mr-2.5" />
            </div>
            <div>
              <Image
                className="absolute min-[0px]:hidden 2xl:block min-[1440px]:right-0 min-[1440px]:top-0 min-[1440px]:h-[700px] min-[1440px]:w-[1032px] -z-[1]"
                src="/images/hero-asset1.png"
                alt="hero-asset1"
                width={1032}
                height={700}
                style={{ objectFit: "cover" }}
                priority={true}
              />
              <Image
                className="min-[0px]:hidden 2xl:block min-[1440px]:right-[160px] min-[1440px]:top-[151px] min-[1440px]:h-[448px] min-[1440px]:w-[452px] z-[100]"
                src="/images/hero-asset2.png"
                alt="hero-asset2"
                width={452}
                height={448}
                style={{ objectFit: "cover" }}
                priority={true}
              />
              <Image
                className="absolute invisible min-[1440px]:visible min-[1440px]:left-0 min-[1440px]:top-[75.5px] min-[1440px]:h-[549px] min-[1440px]:w-[1389px]"
                src="/images/hero-asset3.png"
                alt="hero-asset3"
                width={1389}
                height={549}
                style={{ objectFit: "cover" }}
                priority={true}
              />
              <Image
                className="absolute invisible min-[1440px]:visible min-[1440px]:left-[589px] min-[1440px]:top-[543px] min-[1440px]:h-[26.35px] min-[1440px]:w-[26.35px]"
                src="/images/hero-asset4.png"
                alt="hero-asset1"
                width={26.35}
                height={26.35}
                style={{ objectFit: "cover" }}
                priority={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
