"use client";

import { createContext, useContext, useState } from "react";

const LessonContext = createContext(null);

export function LessonProvider({ children }) {
  const [courseName, setCourseName] = useState("");
  const [price, setPrice] = useState("");
  const [totalLearningTime, setTotalLearningTime] = useState("");
  const [courseSummary, setCourseSummary] = useState("");
  const [courseDetail, setCourseDetail] = useState("");
  const [coverImages, setCoverImages] = useState({});
  const [videoTrailer, setVideoTrailer] = useState({});
  const [attachFile, setAttachFile] = useState({});
  const [lessons, setLessons] = useState([]);

  const [previewImage, setPreviewImage] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  return (
    <LessonContext.Provider
      value={{
        courseName,
        setCourseName,
        price,
        setPrice,
        totalLearningTime,
        setTotalLearningTime,
        courseSummary,
        setCourseSummary,
        courseDetail,
        setCourseDetail,
        coverImages,
        setCoverImages,
        videoTrailer,
        setVideoTrailer,
        attachFile,
        setAttachFile,
        lessons,
        setLessons,
        previewImage,
        setPreviewImage,
        previewVideo,
        setPreviewVideo,
        previewFile,
        setPreviewFile,
      }}
    >
      {children}
    </LessonContext.Provider>
  );
}

export function useLessonContext() {
  return useContext(LessonContext);
}
