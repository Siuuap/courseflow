import Link from "next/link";
import deleteIcon from "@/assets/images/DeleteIcon.svg";
import editIcon from "@/assets/images/EditIcon.svg";
import dragIcon from "@/assets/images/dragIcon.png";
import Image from "next/image";

const mockLessons = [
  { lesson_number: 1, name: "Introduction", sub_lesson: 200 },
  { lesson_number: 3, name: "The JEDI Master", sub_lesson: 12 },
  { lesson_number: 4, name: "How to use Light Saber", sub_lesson: 4 },
  { lesson_number: 2, name: "NO !!!!!!!", sub_lesson: 5 },
];
const lessons = mockLessons.sort(function (a, b) {
  return a.lesson_number - b.lesson_number;
});

export default function LessonBox() {
  return (
    <section className=" min-[375px]:w-[375px] min-[768px]:w-[768px] min-[1200px]:w-[1200px] min-[1440px]:w-[1120px] ">
      <section className="flex justify-between items-center mb-[30px] w-full p-[16px]">
        <p className="text-[24px] ">Lesson</p>
        <Link href="/admin/addlesson">
          <button className="bg-[#2F5FAC] min-[375px]:px-[12px] min-[375px]:py-[8px] min-[768px]:px-[32px] min-[768px]:py-[18px] rounded-[12px] text-[#fff] min-[768px]:text-[16px] hover:bg-[#5483D0]">
            + Add Lesson
          </button>
        </Link>
      </section>
      {/* Lesson Table */}
      <section className="hidden min-[768px]:flex bg-[#E4E6ED] rounded-t-lg px-[24px] py-[10px] mx-[16px] min-[1440px]:m-[0px]">
        <section className="hidden min-[768px]:block w-[56px] "></section>
        <section className="hidden min-[768px]:block w-[48px] "></section>
        <section className="hidden min-[768px]:block w-[500px] ">
          <p>Lesson name</p>
        </section>
        <section className="w-[396px] ">
          <p>Sub-lesson</p>
        </section>
        <section className="w-[120px] text-center">
          <p>Action</p>
        </section>
      </section>
      <section className="flex flex-col gap-[10px] min-[768px]:gap-[0px]">
        {lessons.map(({ lesson_number, name, sub_lesson }, index) => {
          return (
            <section
              key={index}
              className="flex flex-col min-[375px]:mx-auto min-[768px]:mx-[16px] min-[768px]:flex-row min-[375px]:gap-[16px] min-[768px]:gap-[0px] bg-[#fff] min-[375px]:px-[16px] min-[375px]:py-[16px] min-[768px]:px-[28px] min-[768px]:py-[32px] min-[1440px]:m-[0px] min-[375px]:w-[350px] min-[768px]:w-[736px] min-[1200px]:w-[1168px] min-[1440px]:w-[1120px] min-[375px]:rounded-lg min-[768px]:rounded-none"
            >
              <section className="w-[56px]">
                {/* <img src={} alt="drag-icon" width={100} /> */}
              </section>
              <section className="min-[768px]:w-[48px] flex ">
                <p className="min-[768px]:hidden basis-[110px]">Lesson No.</p>
                <p>{lesson_number}</p>
              </section>
              <section className="min-[768px]:w-[500px] flex">
                <p className="min-[768px]:hidden basis-[110px]">Name</p>
                <p>{name}</p>
              </section>
              <section className="min-[768px]:w-[396px] flex">
                <p className="min-[768px]:hidden basis-[110px]">Sub-Lesson</p>
                <p>{sub_lesson}</p>
              </section>
              <section className="min-[768px]:w-[120px] flex justify-center gap-[17px]">
                <button className="flex justify-center items-center basis-1/2 min-[375px]:bg-[#F1F2F6] min-[768px]:bg-transparent hover:bg-[#C8CCDB] rounded-lg min-[768px]:p-0">
                  <Image
                    className="w-[24px] h-[24px]"
                    src={deleteIcon}
                    alt="delete-icon"
                  />
                  <p className="min-[768px]:hidden">Delete</p>
                </button>
                <button className="flex justify-center items-center basis-1/2 min-[375px]:bg-[#F1F2F6] min-[768px]:bg-transparent hover:bg-[#C8CCDB] rounded-lg min-[375px]:p-2 min-[768px]:p-0">
                  <Image
                    className="w-[24px] h-[24px]"
                    src={editIcon}
                    alt="edit-icon"
                  />
                  <p className="min-[768px]:hidden">Edit</p>
                </button>
              </section>
            </section>
          );
        })}
      </section>
    </section>
  );
}
