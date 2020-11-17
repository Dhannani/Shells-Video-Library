import React, { useEffect, useContext } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import CreateUser from "./create-user-form.component";
import UserNav from "./user-nav.component";

export default function LoginWrapper() {
  return (
    <Container className="user-wrapper" fluid="true">
      <Col fluid="true" md={{ span: 3, offset: 4 }}>
        <Card bg="dark">
        <UserNav />

        <CreateUser />
        </Card>
      </Col>
    </Container>
  );
}
