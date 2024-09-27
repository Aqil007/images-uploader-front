import React, { useState } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../redux/reducers/register";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const push = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ formData, push }));
  };
  return (
    <>
      <div className="h-100 ">
        <Row className="h-100 py-5 justify-content-center align-items-center">
          <Col lg={6} sm={12} className="mx-auto">
            <h3 className="text-center mb-5">Register</h3>
            <Form onSubmit={handleFormSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Name</Form.Label>
                <Form.Control
                  type={"text"}
                  placeholder="Enter name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Email</Form.Label>
                <Form.Control
                  type={"text"}
                  placeholder="Enter email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Password</Form.Label>
                <Form.Control
                  type={"password"}
                  placeholder="Enter password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button type="submit" variant="dark" className="fw-bold">
                Sign up
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Register;
