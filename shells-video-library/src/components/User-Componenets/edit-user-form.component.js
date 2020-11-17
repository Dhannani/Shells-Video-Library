import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

import { AuthContext } from "../../context";

export default function EditUserForm() {
  const authContext = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [securePassword, setSecurePassword] = useState("");
  const URLEDIT = "http://localhost:4000/users/edit-user";
  const URLLOGIN = "http://localhost:4000/users/log-in";

  const editUserHandler = () => {
    authContext.sEmail(email);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const verifyUser = {
      email: authContext.email,
      password: securePassword,
    };

    //verify credentials with call to login
    axios
      .post(URLLOGIN, verifyUser)
      .then((res) => {
        console.log("credentials verified for id: " + res.data.user._id);
        const newUserInfo = {
          id: res.data.user._id,
          email: email,
          password: password,
        };

        //update user info
        axios.put(URLEDIT, newUserInfo).then(res => {
            editUserHandler(res.data.token)
            alert("Info Updated!")
            resetForm()
        }).catch((err) => {
            console.log(err);
            alert("incorrect password");
          });
      })
      .catch((err) => {
        console.log(err);
        alert("invalid password");
      });
  };

  const resetForm = () => {
    setEmail(authContext.email);
    setPassword("");
    setSecurePassword("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Form.Group controlId="Email">
        <Form.Label>Change Email</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      {/* TODO change control type to password */}
      <Form.Group controlId="text">
        <Form.Label>Change Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="text">
        <Form.Label>Old Password</Form.Label>
        <Form.Control
          type="password"
          value={securePassword}
          onChange={(e) => setSecurePassword(e.target.value)}
        />
      </Form.Group>
      <Button variant="danger" size="lg" block="block" type="submit">
        Change Info
      </Button>
    </form>
  );
}
