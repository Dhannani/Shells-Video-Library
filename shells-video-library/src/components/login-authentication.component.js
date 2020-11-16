import react, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../App.css"

import { BrowserRouter as Router, Link } from "react-router-dom";

import { AuthContext } from "../context";

export default function Authentication() {
  let authContext = useContext(AuthContext);
  const logoutHandler = () => {
    authContext.logout();
  };

  return (
    <div>
      {!authContext.isLoggedIn && (
        <>
          <Link to="/login">
            <button className="login">
              Login
            </button>
          </Link>
        </>
      )}
      {authContext.isLoggedIn && (
        <Row>
          
        <div>
        <Col>
          <h2 className="welcome-user">Welcome, {authContext.email}</h2>
          </Col>
          <Link to="/my-account">
          <button>
              Account
            </button>
          </Link>
        <button
          // class="btn btn-success my-2 my-sm-0"
          type="submit"
          onClick={logoutHandler}
        >
          Logout
        </button>
        </div>
        </Row>
      )}

      {/* <button className="login">Login</button>
          <button className="logout">Logout</button> */}
    </div>
  );
}
