import React from "react";

function VideoComponent({ video }) {
  return (
    <>
      {typeof video === "string" ? (
        <video
          src={video}
          className="relative h-[200px] rounded-lg"
          accept="video/mov, video/mp4, video/avi"
        ></video>
      ) : (
        <video
          src={URL.createObjectURL(video)}
          className="relative h-[200px] rounded-lg"
          accept="video/mov, video/mp4, video/avi"
        ></video>
      )}
    </>
  );
}
export default React.memo(VideoComponent);
