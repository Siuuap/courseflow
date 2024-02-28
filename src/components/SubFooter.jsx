import Button from "./Button";
import Image from "next/image";
import Link from "next/link";

function SubFooter() {
  return (
    <div className="relative h-[500px] bg-gradient-to-r from-[#2558DD] to-[#5697FF]">
      <div className="flex-col pt-[125px] min-[768px]:flex mx-[auto] p-[14px] max-w-[1120px] min-[1200px]:px-[0px]">
        <p className="font-medium  text-[36px] text-white leading-[45px]">
          Want to start learning?
        </p>
        <section className="pt-[45px]">
          <Button className="bg-white px-8 py-[18px] rounded-[12px] border-[1px] border-[#F47E20] text-base hover:bg-[#f5f5f5] text-[#F47E20] font-bold text-[16px] leading-6">
            <Link href="/register">Register</Link>
          </Button>
        </section>
      </div>
      <Image
        className="absolute left-[689px] top-[48.53px] h-[450px] w-[592px]"
        src="/images/subfooter-asset1.png"
        alt="subfooter-asset1"
        width={592}
        height={450}
        style={{ objectFit: "cover" }}
        priority={true}
      />
      <Image
        className="absolute left-[567px] top-[128px] h-[302px] w-[822px]"
        src="/images/subfooter-asset2.png"
        alt="subfooter-asset2"
        width={822}
        height={302}
        style={{ objectFit: "cover" }}
        priority={true}
      />
    </div>
  );
}
export default SubFooter;
