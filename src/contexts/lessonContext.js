"use client";

import { createContext, useContext, useState } from "react";

const LessonContext = createContext(null);

export function LessonProvider({ children }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [length, setLength] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState({});
  const [videoTrailer, setVideoTrailer] = useState({});
  const [attachedFile, setAttachedFile] = useState({});
  const [lessons, setLessons] = useState([]);

  const [previewImage, setPreviewImage] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);

  const [lessonUpdateId, setLessonUpdateId] = useState([]);
  function resetToDefault() {
    setName("");
    setPrice("");
    setLength("");
    setSummary("");
    setDescription("");
    setCoverImage(null);
    setVideoTrailer(null);
    setAttachedFile(null);
    setLessons([]);
    setPreviewImage(null);
    setPreviewVideo(null);
    setPreviewFile(null);
    setLessonUpdateId([]);
  }
  return (
    <LessonContext.Provider
      value={{
        name,
        setName,
        price,
        setPrice,
        length,
        setLength,
        summary,
        setSummary,
        description,
        setDescription,
        coverImage,
        setCoverImage,
        videoTrailer,
        setVideoTrailer,
        attachedFile,
        setAttachedFile,
        lessons,
        setLessons,
        previewImage,
        setPreviewImage,
        previewVideo,
        setPreviewVideo,
        previewFile,
        setPreviewFile,
        resetToDefault,
        lessonUpdateId,
        setLessonUpdateId,
      }}
    >
      {children}
    </LessonContext.Provider>
  );
}

export function useLessonContext() {
  return useContext(LessonContext);
}
