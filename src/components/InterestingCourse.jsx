import { useState, useEffect } from "react";
import axios from "axios";
import CourseCard from "./CourseCard";

function InterestingCourse() {
  const [otherCourse, setOtherCourse] = useState([]);

  async function getInterestingCourse() {
    try {
      const res = await axios.get(`/api/courses`);
      setOtherCourse(res.data.data);
     
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getInterestingCourse();
  }, []);

  return (
    <div className="interesting-course-container flex content-center justify-center">
      {otherCourse?.slice(0,3).map((item) => {
        return (
          <>
            <CourseCard course={item} />
          </>
        );
      })}
    </div>
  );
}

export default InterestingCourse;
