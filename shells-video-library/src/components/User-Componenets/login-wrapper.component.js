import React, { useEffect, useContext } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Login from "./login-form.component";
import UserNav from "./user-nav.component";

export default function LoginWrapper() {
  return (
    <Container className="user-wrapper" fluid="true">
                           <Row md={{span:6, offset:6} } >
                               <>
                               </>
                           </Row>
                            <Col fluid="true" md={{span:3, offset:5}}>
                            <UserNav />
                            
                            <Login />
                            </Col>
    </Container>
  );
}
