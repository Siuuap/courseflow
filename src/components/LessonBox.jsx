import Link from "next/link";
import deleteIcon from "@/assets/images/DeleteIcon.svg";
import editIcon from "@/assets/images/TaskIcon.svg";
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
    <section className="border border-solid border-[#000] mt-0 m-10 ">
      <section className="flex justify-between items-center mb-[40px] ">
        <p className="text-[24px]">Lesson</p>
        <Link href="/admin/addlesson">
          <button className="bg-[#2F5FAC] min-[375px]:px-[12px] min-[375px]:py-[8px] min-[768px]:px-[32px] min-[768px]:py-[18px] rounded-[12px] text-[#fff] min-[768px]:text-[16px] hover:bg-[#5483D0]">
            + Add Lesson
          </button>
        </Link>
      </section>
      {/* Lesson Table */}
      <section className="border border-solid border-[#000] flex bg-[#E4E6ED] rounded-t-lg px-[24px] py-[10px]">
        <section className="w-[56px] "></section>
        <section className="w-[48px] "></section>
        <section className="w-[500px] ">
          <p>Lesson name</p>
        </section>
        <section className="w-[396px] ">
          <p>Sub-lesson</p>
        </section>
        <section className="w-[120px] text-center">
          <p>Action</p>
        </section>
      </section>

      {lessons.map(({ lesson_number, name, sub_lesson }) => {
        return (
          <section className="flex bg-[#fff] px-[28px] py-[32px]">
            <section className="w-[56px]">
              {/* <img src={} alt="drag-icon" width={100} /> */}
            </section>
            <section className="w-[48px]">
              <p>{lesson_number}</p>
            </section>
            <section className="w-[500px]">
              <p>{name}</p>
            </section>
            <section className="w-[396px]">
              <p>{sub_lesson}</p>
            </section>
            <section className="w-[120px] flex justify-center gap-[17px]">
              <button>
                <Image
                  className="w-[24px] h-[24px] hover:fill-red-600"
                  src={deleteIcon}
                  alt="delete-icon"
                />
              </button>
              <button>
                <Image
                  className="w-[24px] h-[24px]"
                  src={editIcon}
                  alt="edit-icon"
                />
              </button>
            </section>
          </section>
        );
      })}
    </section>
  );
}
