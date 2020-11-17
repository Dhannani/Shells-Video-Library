import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "../../App.css"

import { BrowserRouter as Route, Link } from "react-router-dom";



export default class UserNav extends Component {
 
    render() {
        return (

                    <Navbar className="Login">

                        {/* <Nav className="justify-content-end"> */}
                        
                        <Col md={{span:7}}>
                            <Nav>
                                <Link to={"/create-user"} className="nav-link"> Create User </Link>
                            </Nav>
                        </Col>
                            <Col md={{span:5, offset:0}}>
                            <Nav>
                                <Link to={"/login"} className="nav-link"> Log In </Link>
                            </Nav>
                            </Col>
                        {/* </Nav> */}
                        
                    </Navbar>
                    

        )
    }
}
