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

import { AuthContext } from "../../context";

import Video from "./video.component";
import VideoTableRow from "./video-table-row.component";

export default function UserVideos() {
  const authContext = useContext(AuthContext);
  const [videos, setVideos] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const URLUSERVIDEO =
    "http://localhost:4000/videos/user-videos/" + authContext.id;

  useEffect(() => {
    if (!authContext.id) {
      return;
    }
    console.log(URLUSERVIDEO);
    console.log("list refreshed for user: " + authContext.id);
    axios
      .get(URLUSERVIDEO)
      .then((res) => {
        console.log(res.data);
        setVideos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh, authContext]);

  //   const submitEdit = () => {

  //   }

  return (
    authContext.isLoggedIn && (
      <Container className="user-video-list-container" fluid="false">
        <Col md={{ span: 7, offset: 3 }}>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>
                  <div>My Videos</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {videos.map((vid, index) => (
                <div>
                  <VideoTableRow
                    video={vid}
                    edit={true}
                    refresh={refresh}
                    setRefresh={setRefresh}
                  />
                </div>
              ))}
            </tbody>
          </Table>
        </Col>
      </Container>
    )
  );
}
