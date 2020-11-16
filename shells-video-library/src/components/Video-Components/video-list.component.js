import React, { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Moment from "moment";

import Video from "./video.component";
import VideoTableRow from "./video-table-row.component";

export default function VideoList(child) {
  const [videos, setVideos] = useState([]);
  const [allVideos, setAllVideos] = useState(videos);
  const [file, setFile] = useState("");
  const [empty, setEmpty] = useState(true);

  const [updateFilter, setUpdateFilter] = useState(false);

  const BASEURL = child.url;

  const filterVideos = () => {
    //console.log(videos);
    setVideos(
      videos.filter(
        (vid) =>
          vid.title.toLowerCase().includes(child.filter.Title.toLowerCase()) &&
          vid.genre.includes(child.filter.Genre) &&
          vid.rating.overall >= child.filter.Rating &&
          !Moment(vid.releaseDate.split("T")[0]).isBefore(
            child.filter.ReleaseDate
          )
      )
    );
  };

  useLayoutEffect(() => {
    console.log("refreshing library");
    axios
      .get(BASEURL)
      .then((res) => {
        console.log(res.data);
        setVideos(res.data);
        if (res.data != {}) {
          setEmpty(false);
          setAllVideos(res.data);
          console.log("videos fetched");
          console.log(allVideos);
          //filterVideos();
        }
      })
      .catch((err) => {
        console.log(err);
        return err;
      });

    return () => console.log("unmounting...");
  }, []);

  useEffect(() => {
    //console.log("starting filter")
    setUpdateFilter(!updateFilter);
    setVideos(allVideos);
  }, [child.filter]);

  useEffect(() => {
    filterVideos();
  }, [updateFilter]);

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
