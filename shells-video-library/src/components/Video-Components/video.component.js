import react, { useState, useEffect, Children } from "react";
import { Player } from "video-react";
export default function Video(file) {
  const FILEPATH = "videos/" + file.file;

  useEffect(() => {
    console.log("FILEPATH: " + FILEPATH);
  });

  return (
    <div>
      <video controls={file.load} width={file.width} height={file.height}>
        <source src={FILEPATH} />
        <p>Your browser cannot play the provided video file.</p>
      </video>
      {/* <Player
        playsInline
        controls
        src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
        fluid={false}
        width={100}
        height={50}
      /> */}
    </div>
  );
} // https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.webm
