import react, { useState, useEffect, Children } from "react";
import { Player } from "video-react";
export default function Video(file) {
  const FILEPATH = file.file;

  useEffect(() => {
    //console.log("FILEPATH: " + FILEPATH);
  }, [file]);

  return (
    <div>
      <video controls={file.load} width={file.width} height={file.height}>
        <source src={FILEPATH} />
        <source src={FILEPATH} type="video/mp4"/>
        <p>Your browser cannot play the provided video file.</p>
      </video>
      {/* <Player
        playsInline
        controls={file.load} width={file.width} height={file.height}
        src={FILEPATH}
        fluid={false}
      /> */}
    </div>
  );
} // https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.webm
// https://media.w3.org/2010/05/sintel/trailer_hd.mp4
