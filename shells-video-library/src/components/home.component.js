import react from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { BrowserRouter as Router, Link } from "react-router-dom";

export default function UserVideos() {
  return (
    <div>
      <h1>Welcome to Shells Video Library!</h1>
<h1>--------------------------------------------------</h1>
      <Col md={{ span: 2, offset: 5 }} >
      <Link to="/videos">
        <Card bg="dark">Explore Library</Card>
      </Link>
      <Link to="/upload">
        <Card bg="dark">Upload a Video</Card>
      </Link>
      </Col>
    </div>
  );
}
