import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { AuthContext } from "../../context";

import EditUser from "./edit-user-form.component";

export default function MyAccount() {
  let authContext = useContext(AuthContext);
  return (
    <div>
      {authContext.isLoggedIn && (
        <div>
            
          <Container className="user-wrapper" fluid="true">
            <Row md={{ span: 12, offset: 6 }}>
            
              <></>
            </Row>
            <Col fluid="true" md={{ span: 3, offset: 5 }}>
            <h1 className="my-account-header"> Manage Account </h1>
              <EditUser />
            </Col>
          </Container>
        </div>
      )}
    </div>
  );
}
