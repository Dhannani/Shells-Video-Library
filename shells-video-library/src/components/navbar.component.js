import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Nav from "react-bootstrap/Nav";
import "../App.css"

import { BrowserRouter as Router, Link } from "react-router-dom";

import LoginAuth from "./login-authentication.component";
import {AuthContext} from "../context"

export default function NavBar() {

  const authContext = useContext(AuthContext);




  
    return (
      <Nav class="navbar navbar-expand-lg navbar-light bg-light">
        <Link to={"/"} className="nav-link">
          <div className="navbar-home-link">Shells Video Library </div>
        </Link>
        {/* <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button> */}

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <Link to={"/videos"} className="nav-link">
                <div className="nav-link">
                Search Videos
                </div>
              </Link>
            </li>
            <li class="nav-item">
            <Link to={"/upload"} className="nav-link">
            <div className="nav-link"> 
                Upload
                </div>
              </Link>
            </li>
            {authContext.isLoggedIn && (
            <li class="nav-item">
            <Link to={"/my-videos"} className="nav-link">
              <div className="nav-link">
                My Videos
                </div>
              </Link>
            </li>
            )}
          </ul>
         <LoginAuth />
        </div>
      </Nav>
    );

}
