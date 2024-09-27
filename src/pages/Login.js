import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/reducers/login";
import Form from "react-bootstrap/Form";
import { Button, Col, Row } from "react-bootstrap";

const Login = () => {
  console.log("process===", process.env.REACT_APP_TEST);
  const nevigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ formData, push: nevigate }));
  };
  return (
    <>
      <div className="h-100 ">
        <Row className="h-100 py-5 justify-content-center align-items-center">
          <Col lg={6} sm={12} className="mx-auto ">
            <h3 className="text-center mb-5">Login</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Email</Form.Label>
                <Form.Control
                  type="email"
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
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <div className="d-flex justify-content-between align-items-center">
                <Button type="submit" variant="dark" className="fw-bold">
                  Login
                </Button>
                <Link to="/forgot-password">Forgot password</Link>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Login;
