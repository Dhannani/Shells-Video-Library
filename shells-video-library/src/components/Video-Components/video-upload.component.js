import react, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import axios from "axios";
import Moment from "moment";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./video.css"

import { AuthContext } from "../../context";

import Video from "./video.component";
import VideoTableRow from "./video-table-row.component";

export default function VideoUpload() {
  const authContext = useContext(AuthContext);

  const DEFAULTGENRE = "Select Genre";

  const URLVIDEO = "http://localhost:4000/videos/uploadVideo",
    URLMETADATA = "http://localhost:4000/videos/videoMetadata";

  const [file, setFile] = useState(undefined);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState(DEFAULTGENRE);
  const [synopsis, setSynopsis] = useState("");

  const NOFILE = "No File\n";
  const INVALIDFILE = "File invalid\n";
  const NOTITLE = "No title\n";
  const NOGENRE = "No genre\n";

  

  const categories = ["Movie", "TV Show", "Documentary"];



  const uploadFile = (evt) => {
    evt.preventDefault();
    if (!validateForm()) {
      console.log("invalid file");
      return;
    }

    //var filename = document.getElementById("file-id").files[0].name;


    let formData = new FormData();
    formData.append("file", file);

    // upload the video
    axios
      .post(URLVIDEO, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        let filename = res.data.filename;
        console.log(filename + " uploaded");

        let date = Moment().format("YYYY-MM-DD");
        console.log("uploaded on " + date);

        const videoObj = {
          email: authContext.email,
          userId: authContext.id,
          file: filename,
          title: title,
          genre: genre,
          synopsis: synopsis,
          releaseDate: date,
          rating: {
            total: 0,
            count: 0,
          },
        };

        //upload video metadata if video upload successful
        axios
          .post(URLMETADATA, videoObj)
          .then((res) => {
            console.log("ayy " + title);
            alert("File Uploaded!")
            resetForm();
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resetForm = () => {
    setFile(null);
    setTitle("");
    setSynopsis("");
    setGenre(DEFAULTGENRE);
  };

  const validateForm = () => {
    let isValid = true;
    let errStr = "";
    if (file === undefined) {
      isValid = false;
      errStr += NOFILE;
    }
    if (title.length === 0) {
      isValid = false;
      errStr += NOTITLE;
    }
    if (genre === DEFAULTGENRE) {
      isValid = false;
      errStr += NOGENRE;
    }

    if (!isValid) {
      alert(errStr);
      return false;
    }
    return true;
  };

  return (
    <div>
    {authContext.isLoggedIn && (
      <div>
        <h1>Upload A Video</h1>
        <Container className="upload-video-container" fluid="true">
          <Col md={{offset:4, span:4}}>
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
                rows={4}
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
                <Col md={{offset: 5}}>
                
                
            <Form.File
              id="video-upload-file"
              className="video-upload-file"
              accept="video/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
            </Col>
            </Row>
            <button onClick={uploadFile}>Upload!</button>

            {/* <Video file="video.mp4"/> */}
          </div>
          </Col>
        </Container>

        {file && (
          <div>
            <h1>FILE SELECTED</h1>
            {/* <Video video={file} /> */}
          </div>
        )}

        
      </div>
    )}

    {!authContext.isLoggedIn && (
      <h2>Log in to upload a video!</h2>
    )}

</div>
  );
}
