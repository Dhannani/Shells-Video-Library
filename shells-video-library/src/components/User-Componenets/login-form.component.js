import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';

import {AuthContext} from "../../context"


export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const URL = "http://localhost:4000/users/log-in";

  let authContext = useContext(AuthContext)
  const loginHandler = (token, id) => {
    authContext.sEmail(email);
    authContext.login(token);
    authContext.sId(id)
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    //alert('Submitting Name ' + email)
    
    const user = {
        email: email,
        password: password
    }
    axios.post(URL, user).then(res => {
        console.log(res.data)
        if(res.status === 200) {
          console.log(res.data.user._id)
            loginHandler(res.data.token, res.data.user._id);
        }
        else {
            alert("Invalid email or password")
        }
    })
    setEmail("")
    setPassword("")
  };

  return (
    <form onSubmit={handleSubmit}>
      <Form.Group controlId="Email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="name"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="Password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="danger" size="lg" block="block" type="submit">
            Login
          </Button>
    </form>
  );
}
