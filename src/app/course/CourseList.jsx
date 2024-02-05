import { Link } from "next/link";

export default function CourseList({ course }) {
  return (
    <ul className="course-list mt-32 flex  flex-wrap justify-evenly max-w-[1120px] mx-auto ">
      {course?.map((course) => (
        <Course key={course.course_id} course={course} />
      ))}
    </ul>
  );
}

function Course({ course }) {
  return (
    <div className="course-container max-w-xs mt-16 mx-3 relative ">
      <div className="course shadow-[0px_5px_5px_0px_rgba(100,109,137,1)] rounded-md w-[320px] h-[538px]">
        <div className="course-img ">
          <img
            src={course.img_url}
            alt={course.course_id}
            className="course-poster-img mb-6 w-[357px] h-[240px] block rounded-t-md"
          />
          <span className=" text-[#F47E20] ml-3">Course</span>
        </div>
        <div className="course-description-container m-3">
          <a
            href={`/
            course/${course.course_id}`}
            className="course-name hover:text-[#F47E20] leading-[30px] text-[24px] w-[325px] h-[30px]"
          >
            {course.name}
          </a>
          <p className="course-description text-[16px] leading-[24px] pb-3 text-[#646D89]">
            Description {course.description.slice(0, 120)}
          </p>
        </div>
        <div className="course-detail-container  p-[16px] border-t-[1px]  absolute bottom-0 w-[320px]">
          <span className="mr-3 text-[#646D89]">
            <i>
              <img src="icons/book.png" className="inline-block mr-3" />
            </i>
            {course.lessons_test.length} Lesson(s)
          </span>
          <span className="text-[#646D89]">
            <i>
              <img src="icons/clock.png" className="inline-block mr-3 " />
            </i>
            {course.length} Hr.
          </span>
        </div>
      </div>
    </div>
  );
}
