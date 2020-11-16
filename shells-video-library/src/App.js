import react, { useState, useEffect, useLayoutEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Cookie from "js-cookie";
import axios from "axios";

import { BrowserRouter as Router, Link } from "react-router-dom";

import Navbar from "./components/navbar.component";
import Main from "./components/main.component";
import { AuthContext } from "./context";

export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  const [userEmail, setUserEmail] = useState(null);
  const [userId, setUserId] = useState(null);

  const store = (info) => {
    localStorage.setItem(
      "userData",
      JSON.stringify({
        info,
      })
    );
    console.log(JSON.parse(localStorage.getItem("userData")));
  };

  const retrieve = () => {
    return localStorage.getItem("userData");
  };

  const login = (token) => {
    setToken(token);
    setLoggedIn(true);
    store(token);
  };

  const sEmail = (e) => {
    setUserEmail(e);

  };

  const sId = (e) => {
    setUserId(e);
  };
  const logout = () => {
    setToken(null);
    setLoggedIn(false);
    AuthContext.email = null;
    localStorage.removeItem("userData");
  };

  useLayoutEffect(() => {
    if(!retrieve()) {
      console.log("not logged in")
      return;
      //logout();
    }
    let token = JSON.parse(retrieve()).info;
    //console.log("JWT: " + accessString);
    //let authorized = authorize(accessString);
    //console.log(authorized)
    // if (authorized) {
    //   console.log("is logged in")
    //   setLoggedIn(true);
    // } else {
    //   console.log("not logged in")
    //   //logout();
    // }

    axios
      .get("http://localhost:4000/users/authorize", {
        headers: { Authorization: "JWT " + token },
      })
      .then(res => {
        //console.log(res)
        if (res.status === 200) {
          console.log("authorized")
          //console.log(res.data);
          setLoggedIn(true);
          setUserEmail(res.data.email)
          setUserId(res.data._id)
        } else {
          console.log("unauthorized")
          setLoggedIn(false);
        }
      })
      .catch((err) => {
        console.log(err)
        return false;
      });



  }, [setLoggedIn]);


  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
        sEmail: sEmail,
        sId: sId,
        email: userEmail,
        id: userId
      }}
    >
      <Main />
    </AuthContext.Provider>
  );
}

//export default App;
