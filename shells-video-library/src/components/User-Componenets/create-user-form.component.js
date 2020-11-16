import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';

export default function CreateUserForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const URL = "http://localhost:4000/users/create-user"

  const handleSubmit = (evt) => {
    evt.preventDefault();
    alert('Creating user ' + email);
    const user = {
        email: email,
        password: password
    }
    axios.post(URL, user).then(res => {
        console.log(res.data)
    })
    setEmail("")
    setPassword("")
  };

  return (
    <form onSubmit={handleSubmit}>
      <Form.Group controlId="Email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Form.Group>

        { /* TODO change control type to password */ }
          <Form.Group controlId="text">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="danger" size="lg" block="block" type="submit">
            Create Account
          </Button>
    </form>
  );
}