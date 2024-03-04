import Link from "next/link";
import BookIcon from "@/assets/images/icons/BookIcon.svg";
import ClockIcon from "@/assets/images/icons/ClockIcon.svg";
import Image from "next/image";

function CourseCard({ course }) {
  return (
    <Link href={`/course/${course.course_id}`}>
      <div className="course-container max-w-xs mb-[16px] relative ">
        <div className="course shadow-[0px_5px_5px_0px_rgba(100,109,137,1)] rounded-md w-[320px] h-[538px]">
          <div className="course-img  ">
            <img
              src={course.img_url}
              alt={course.course_id}
              className="course-poster-img mb-6 w-[357px] h-[240px] block rounded-t-md object-cover"
            />
            <span className=" text-[#F47E20] ml-3">Course</span>
          </div>
          <div className="course-description-container m-3 ">
            <span className="course-name hover:text-[#F47E20] leading-[30px] text-[24px] w-[325px] h-[30px]">
              {course.name}
            </span>

            <p className="course-description text-[16px] leading-[24px] pb-3 text-[#646D89]">
              {course.summary}
            </p>
          </div>
          <div className="course-detail-container  p-[16px] border-t-[1px]  absolute bottom-0 w-[320px]">
            <span className="mr-3 text-[#646D89]">
              <i>
                <Image
                  src={BookIcon}
                  className="inline-block mr-3"
                  alt="book icon"
                />
              </i>
              {course?.lessons?.length} Lesson(s)
            </span>
            <span className="text-[#646D89]">
              <i>
                <Image
                  src={ClockIcon}
                  className="inline-block mr-3 "
                  alt="clock icon"
                />
              </i>
              {course.length} Hr.
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CourseCard;
