import react, { useContext, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Ratings from "react-ratings-declarative";
import axios from "axios";
import "./video.css";
import Moment from "moment";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams,
  useLocation,
} from "react-router-dom";

import VideoContainer from "./video-container.component";

export default function VideoContainerWrapper() {
    let params = useParams();
  
  
  
    const VIDEOURL = "http://localhost:4000/videos/" + params.id;
  
    const [isVideo, setIsVideo] = useState(false);
    const [video, setVideo] = useState(null);
  
    useEffect(() => {
      console.log("mounting video container...")
      console.log(params.id)
      axios.get(VIDEOURL).then(res =>{
        if(res.data) {
            console.log(res.data)
            setVideo(res.data)
            setIsVideo(true)
        }
      }).catch(err => {
        console.log(err);
      })
      
    }, []);

    return (
        <div>
            {video && <VideoContainer video={video}/>}
        </div>
    )
}