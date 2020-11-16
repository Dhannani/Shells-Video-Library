import React, { useContext, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import axios from "axios";
import Moment from "moment";
import "./video.css";

import Video from "./video.component";
import VideoContainer from "./video-container.component";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useParams,
  useLocation,
} from "react-router-dom";

export default function VideoTableRow(child) {
  const TITLE = child.video.title;
  const USER = child.video.email;
  const DESCRIPTION = child.video.synopsis;
  const GENRE = child.video.genre;
  const ID = child.video._id;
  const FILE = child.video.file;
  const REALEASEDATE = Moment(child.video.releaseDate.split("T")[0]).format(
    "MMMM D, YYYY"
  );
  const CANEDIT = child.edit;
  const THUMBNAIL_WIDTH = 400,
    THUMBNAIL_HEIGHT = 300;

  const URLEDITVIDEO = "http://localhost:4000/videos/edit-video",
    URLDELETEVIDEO = "http://localhost:4000/videos/delete";

  const NOTITLE = "No title\n";

  const [edit, SetEdit] = useState(false);
  const categories = ["Movie", "TV Show", "Documentary"];
  const [title, setTitle] = useState(TITLE);
  const [genre, setGenre] = useState(GENRE);
  const [synopsis, setSynopsis] = useState(DESCRIPTION);

  useEffect(() => {
    console.log(TITLE);
    console.log(edit);
  }, [edit]);

  const SubmitEditHandler = () => {
    if (!validateForm()) {
      console.log("invalid edits");
      return;
    }

    const editObj = {
      title: title,
      genre: genre,
      synopsis: synopsis,
      videoId: ID,
    };

    axios.put(URLEDITVIDEO, editObj).then((res) => {
      console.log(res.data);
      SetEdit(false);
      child.setRefresh(!child.refresh);
    });
  };

  const deleteVideo = () => {
    const videoObj = {
      file: FILE,
      id: ID,
    };
    axios
      .delete(URLDELETEVIDEO, { params: videoObj })
      .then((res) => {
        console.log(res.data);
        SetEdit(false);
        child.setRefresh(!child.refresh);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const validateForm = () => {
    let isValid = true;
    let errStr = "";
    if (title.length === 0) {
      isValid = false;
      errStr += NOTITLE;
    }

    if (!isValid) {
      alert(errStr);
      return false;
    }
    return true;
  };

  // const videoEditForm = () => {
  //   return (
  //     <Container className="upload-video-container" fluid="true">
  //       <Col md={{ offset: 4, span: 4 }}>
  //         <div>
  //           <Form.Group controlId="Title">
  //             <Form.Label>Title</Form.Label>
  //             <Form.Control
  //               type="name"
  //               value={title}
  //               onChange={(e) => setTitle(e.target.value)}
  //             />
  //           </Form.Group>

  //           <Form.Group controlId="Synopsis">
  //             {/* <Form.Label>Description</Form.Label> */}
  //             <Form.Control
  //               type="textarea"
  //               rows={4}
  //               value={synopsis}
  //               placeholder="Description (optional)"
  //               onChange={(e) => setSynopsis(e.target.value)}
  //             />
  //           </Form.Group>

  //           <Row>
  //             <Col>
  //               <DropdownButton
  //                 variant="light"
  //                 id="dropdown-basic-button"
  //                 title={genre}
  //               >
  //                 {categories.map((category, index) => (
  //                   <div>
  //                     <Dropdown.Item onSelect={() => setGenre(category)}>
  //                       {category}
  //                     </Dropdown.Item>
  //                   </div>
  //                 ))}
  //               </DropdownButton>
  //             </Col>
  //           </Row>
  //           <button onClick={SubmitEditHandler}>Submit Changes</button>

  //           {/* <Video file="video.mp4"/> */}
  //         </div>
  //       </Col>
  //     </Container>
  //   );
  // };

  return (
    <div>
      <tr>
        <Link classname="video-table-row-link" to={"video/" + child.video._id} style={{"text-decoration": "none"}}>
          <th>
            <Video
              file={child.video.file}
              load={false}
              width={THUMBNAIL_WIDTH}
              height={THUMBNAIL_HEIGHT}
            />
            {/* <VideoContainer video={child.video} /> */}
          </th>

          {!edit && (
            <th fluid="true">
              <Row>{TITLE}</Row>
              <Row>{DESCRIPTION}</Row>
              <Row>{GENRE}</Row>
              <Row>Uploaded by: {USER}</Row>
            </th>
          )}
          {edit && (
            <Container className="video-table-row-edit-container">
              <div>
                <Form.Group controlId="Title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="Synopsis">
                  {/* <Form.Label>Description</Form.Label> */}
                  <Form.Control
                    type="textarea"
                    value={synopsis}
                    placeholder="Description (optional)"
                    onChange={(e) => setSynopsis(e.target.value)}
                  />
                </Form.Group>

                <Row>
                  <Col>
                    <DropdownButton
                      variant="light"
                      id="dropdown-basic-button"
                      title={genre}
                    >
                      {categories.map((category, index) => (
                        <div>
                          <Dropdown.Item onSelect={() => setGenre(category)}>
                            {category}
                          </Dropdown.Item>
                        </div>
                      ))}
                    </DropdownButton>
                  </Col>
                </Row>
                <button onClick={SubmitEditHandler}>Submit Changes</button>

                {/* <Video file="video.mp4"/> */}
              </div>
            </Container>
          )}
        </Link>

        {CANEDIT && (
          
            <th fluid="true" classname="video-table-row-edit-delete">
              <Row>
                <Button
                  variant="warning"
                  size="lg"
                  block="block"
                  onClick={() => SetEdit(!edit)}
                >
                  EDIT
                </Button>
              </Row>

              <Button
                variant="danger"
                size="lg"
                block="block"
                onClick={deleteVideo}
              >
                DELETE
              </Button>
            </th>
          
        )}
      </tr>
    </div>
  );
}
