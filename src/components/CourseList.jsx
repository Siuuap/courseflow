import CourseCard from "@/components/CourseCard";


function CourseList({ course }) {
  return (
    <ul className="course-list mt-32 flex  flex-wrap justify-evenly max-w-[1120px] mx-auto ">
      {course?.map((course) => (
        <CourseCard key={course.course_id} course={course} />
      ))}
    </ul>
  );
}

export default CourseList;
