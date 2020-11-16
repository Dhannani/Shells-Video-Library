import React, { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Moment from "moment"

import Video from "./video.component";
import VideoTableRow from "./video-table-row.component";

export default function VideoList(child) {
  const [videos, setVideos] = useState([]);
  const [file, setFile] = useState("");
  const [empty, setEmpty] = useState(true);

  const BASEURL = child.url;

  const filterVideos = () => {
    console.log("Title Filter: " + child.filter.Title);
    console.log("Genre Filter: " + child.filter.Genre);
    console.log("Rating Filter: " + child.filter.Rating);
    console.log("Release Date Filter: " + child.filter.ReleaseDate)

    if (child.filter.Title !== "") {
      setVideos(videos.filter((vid) => vid.title.includes(child.filter.Title)));
    }
    if (child.filter.Genre !== "") {
      setVideos(videos.filter((vid) => vid.genre.includes(child.filter.Genre)));
    }
    if (child.filter.Rating) {
      setVideos(
        videos.filter((vid) => vid.rating.overall > child.filter.Rating)
      );
    }
    if (child.filter.ReleaseDate) {
      
      setVideos(
        videos.filter((vid) => !Moment(vid.releaseDate.split('T')[0]).isBefore(child.filter.ReleaseDate))
      )
      }
      
  };

  useEffect(() => {
    console.log("refreshing library");
    axios
      .get(BASEURL)
      .then((res) => {
        //console.log(res.data);
        if (res.data != {}) {
          setEmpty(false);
          setVideos(res.data);
          console.log(videos);
          filterVideos();
        }
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
    return () => console.log("unmounting...");
  }, [child.filter]);

  return (
    <div>
      {!empty && (
        <div>
          {/* <Video file="video.mp4"/> */}

          <tbody>
            {videos.map((vid, index) => (
              <div>
                <VideoTableRow video={vid} edit={false} />
              </div>
            ))}
          </tbody>
        </div>
      )}
      {empty && <h2> Library is empty :(</h2>}
    </div>
  );
}
