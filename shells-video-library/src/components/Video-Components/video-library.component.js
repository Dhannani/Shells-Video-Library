import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import VideoList from "./video-list.component";
import VideoFilter from "./video-filter.component";

export default function VideoLibrary() {
  const [url, setUrl] = useState("http://localhost:4000/videos/");
  const [filter, setFilter] = useState({
    Title: "",
    Genre: "",
    ReleaseDate: "",
    Rating: -1,
  });

  return (
    <div>
      <h1>Video Library </h1>
      <Container className="video-list-container" fluid="false">
        <Row>
          <Col md={2}>
            <VideoFilter setFilter={setFilter} filter={filter} />
          </Col>

          <Col md={{ span: 4, offset: 1 }}>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>
                    <div>Videos</div>
                  </th>
                </tr>
              </thead>
              <VideoList url={url} filter={filter} />
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
