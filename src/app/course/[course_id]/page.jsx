"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Accordion } from "@chakra-ui/react";
import CourseAccordion from "@/components/CourseAccordion";
import InterestingCourse from "@/components/InterestingCourse";
import NavBar from "@/components/NavBar";
import SubFooter from "@/components/SubFooter";
import Footer from "@/components/Footer";
import ConfirmationModal from "@/components/ConfirmationModal";

export default function CourseDetail({ params }) {
  const [courseById, setCourseById] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const id = params?.course_id;

  async function fetchCourse() {
    const res = await axios.get(`/api/courses/${id}`);
    const course = res.data.data;
    setCourseById(course);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <>
      <NavBar />
      <div className="container w-full  my-[30px] flex flex-row mx-auto mt-[100px] ">
        <div className="detail-container w-[1120px] self-center ">
          <img
            src={courseById[0]?.img_url}
            className="w-[740px] h-[460px] rounded-[8px]"
            alt={courseById[0]?.name}
          />
          <section className="detail-section my-12 w-[740px] ">
            <h1 className=" text-[36px] font-medium ">Course Detail</h1>
            <p className="text-[#646D89] mt-6">{courseById[0]?.description}</p>
          </section>
          <section>
            <h1 className="font-medium text-3xl my-[24px]">Module Samples</h1>
            <div>
              <Accordion defaultIndex={[0]} allowMultiple>
                {courseById[0]?.lessons?.map((lesson, i) => (
                  <CourseAccordion lesson={lesson} index={i} key={i} />
                ))}
              </Accordion>
            </div>
          </section>
        </div>
        {!isLoading&&
        <div className="sticky-box w-[357px] h-[450px] m-4 shadow-[0px_5px_5px_0px_rgba(100,109,137,1)] px-6 py-8 rounded-xl sticky top-10">
          <div>
            <p className="text-[#F47E20]">Course</p>
            <h1 className="text-2xl font-bold mt-2">{courseById[0]?.name}</h1>
            <p className="text-[#646D89] mt-2">{courseById[0]?.description}</p>
            <p className="text-2xl font-bold text-[#646D89] mt-3">
              THB {courseById[0]?.price + ".00"}
            </p>
          </div>
          <div className="sticky-box-btn-container border-t-2 border-[#d6d9e7] mt-6">
             <ConfirmationModal course={courseById} />
          </div>
        </div>
        }
      </div>

      <div className="intersting-course-section  mt-[200px] mb-[200px]">
        <h1 className="text-center h-[45px] text-5xl mb-16">
          Other Interesting Course
        </h1>
        <InterestingCourse />
      </div>

      <SubFooter />
      <Footer />
    </>
  );
}
