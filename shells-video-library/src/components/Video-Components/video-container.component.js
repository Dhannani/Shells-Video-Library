import react, { useContext, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Ratings from "react-ratings-declarative";
import axios from "axios";
import "./video.css";
import Moment from "moment";

import { AuthContext } from "../../context";

import Video from "./video.component";

export default function VideoContainer(child) {
  const authContext = useContext(AuthContext);

  const TITLE = child.video.title;
  const USER = child.video.email;
  const DESCRIPTION = child.video.synopsis;
  const GENRE = child.video.genre;
  const OVERALLRATING = child.video.rating.overall;
  const REALEASEDATE = Moment(child.video.releaseDate.split("T")[0]).format(
    "MMMM D, YYYY"
  );
  const VIDEOID = child.video._id;
  const VIDEO_WIDTH = 800,
    VIDEO_HEIGHT = 600;

  const RATEURL = "http://localhost:4000/videos/rate";

  const [rating, setRating] = useState(OVERALLRATING);

  useEffect(() => {
    console.log("mounting video container...");
    console.log(VIDEOID);

    console.log("release date: " + REALEASEDATE);
  });

  const rate = (newRating) => {
    setRating(newRating);
    console.log(newRating);
    const videoRating = {
      rating: newRating,
      videoId: VIDEOID,
      userId: authContext.id,
    };
    axios
      .put(RATEURL, videoRating)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const renderRate = () => {
    if (authContext.isLoggedIn) {
      return (
        <Ratings
          rating={rating}
          widgetRatedColors="rgb(230, 67, 47)"
          changeRating={rate}
        >
          <Ratings.Widget widgetDimension="30px" widgetHoverColor="yellow" />
          <Ratings.Widget widgetDimension="30px" widgetHoverColor="yellow" />
          <Ratings.Widget widgetDimension="30px" widgetHoverColor="yellow" />
          <Ratings.Widget widgetDimension="30px" widgetHoverColor="yellow" />
          <Ratings.Widget widgetDimension="30px" widgetHoverColor="yellow" />
        </Ratings>
      );
    } else {
      return (
        <div>
          <Ratings
            rating={rating}
          >
            <Ratings.Widget widgetDimension="30px" />
            <Ratings.Widget widgetDimension="30px" />
            <Ratings.Widget widgetDimension="30px" />
            <Ratings.Widget widgetDimension="30px" />
            <Ratings.Widget widgetDimension="30px" />
          </Ratings>
        </div>
      );
    }
  };

  return (
    <div className="video-container">
      <Col md={{ span: 4, offset: 4 }}>
        <Row>
          <Col md={{ span: 6, offset: 2 }}>
            <div className="video-container-title">{TITLE}</div>
          </Col>
        </Row>
        <Row>
          <Video
            file={child.video.file}
            load={true}
            width={VIDEO_WIDTH}
            height={VIDEO_HEIGHT}
          />
        </Row>
        <Row className="video-container-data">
          <Col className="video-container-user-col" md={{ span: 5, offset: 0 }}>
            <Row>
            <div className="video-container-user">uploaded by {USER} </div>
            </Row>
            <Row>
            <div className="video-container-date">{REALEASEDATE}</div>
            </Row>
          </Col>
          <Col md={{ offset: 3 }}>
            <div className="video-container-rating">{renderRate()}</div>
          </Col>
        </Row>
        <Row>
        <p className="video-container-seperator">------------------------------------------------</p>
        </Row>
        <Row>
          <div className="video-container-description">{DESCRIPTION}</div>
          </Row>
       
      </Col>
    </div>
  );
}
