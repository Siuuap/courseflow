import Button from "./Button";

function NavBar() {
  return (
    <nav className="min-[768px]:flex justify-between items-center mx-[auto] p-[14px] max-w-[1120px] min-[1200px]:px-[0px]">
      <section>
        <p>CourseFlow</p>
      </section>
      <section className="flex items-center justify-between gap-[56px]">
        <a className="text-[#191C77]">Our Course</a>
        <Button className="bg-[#2F5FAC] px-8 py-[18px] rounded-xl text-base hover:bg-[#5483D0] text-white">
          Login
        </Button>
      </section>
    </nav>
  );
}
export default NavBar;
