import NavBar from "@/components/NavBarTemp";

export default function Home() {
  return (
    <>
      <NavBar />
      <div className=" flex items-center">
        <div className=" mx-auto bg-slate-100 w-[1440px]">
          <h1 className="text-[50px] text-center">this is homepage</h1>
        </div>
      </div>
    </>
  );
}
