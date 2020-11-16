import React, { Component, useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../App.css";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";

import { AuthContext } from "../context";

import Navbar from "./navbar.component";
import Home from "./home.component";
import VideoUpload from "./Video-Components/video-upload.component";
import UserVideos from "./Video-Components/user-videos.component";
import Login from "./User-Componenets/login-wrapper.component";
import CreateUser from "./User-Componenets/create-user-wrapper.component";
import MyAccount from "./User-Componenets/my-account.component";
import VideoLibrary from "./Video-Components/video-library.component";
import VideoContainerWrapper from "./Video-Components/video-container-wrapper.component";
import Test from "./Video-Components/test.component";

export default function Main() {
  let authContext = useContext(AuthContext);

  return (
    <Router>
      <div className="App">
        <Navbar />

        <header className="App-header">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/my-videos" component={UserVideos} >
            {!authContext.isLoggedIn ? (
                <Redirect to="/login" />
              ) : (
                <UserVideos />
              )}
              </Route>
            <Route path="/upload" component={VideoUpload} />
            <Route path="/login" component={Login}>
              {authContext.isLoggedIn ? (
                <Redirect to="/my-videos" />
              ) : (
                <Login />
              )}
            </Route>
            <Route path="/create-user" component={CreateUser}>
              {authContext.isLoggedIn ? (
                <Redirect to="/my-videos" />
              ) : (
                <CreateUser />
              )}
            </Route>
            <Route path="/videos" component={VideoLibrary} />
            <Route path="/my-account" component={MyAccount}>
              {!authContext.isLoggedIn ? (
                <Redirect to="/login" />
              ) : (
                <MyAccount />
              )}
            </Route>
            <Route path={"/video/:id"} component={VideoContainerWrapper} />
              
            
          </Switch>
        </header>
      </div>
    </Router>
  );
}
