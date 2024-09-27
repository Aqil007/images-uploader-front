import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/reducers/login";
import Form from "react-bootstrap/Form";
import { Button, Col, Row } from "react-bootstrap";
import { forgPAssword } from "../redux/reducers/forgotPassword";

const ForgotPassword = () => {
  const nevigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    repreateNewPassword: "",
  });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, newPassword, repreateNewPassword } = formData;
    if (email && newPassword && repreateNewPassword) {
      if (newPassword !== repreateNewPassword) {
        alert("Password not match !");
      } else {
        dispatch(
          forgPAssword({
            fData: { email: formData.email, newPassword: formData.newPassword },
            push: nevigate,
          })
        );
      }
    } else {
      alert("All fields are required !");
    }
  };
  return (
    <>
      <div className="h-100 ">
        <Row className="h-100 py-5 justify-content-center align-items-center">
          <Col lg={6} sm={12} className="mx-auto ">
            <h3 className="text-center mb-5">Reset Password</h3>
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
                <Form.Label className="fw-bold">New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Repeat New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Re-Enter new password"
                  name="repreateNewPassword"
                  value={formData.repreateNewPassword}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button type="submit" variant="dark" className="fw-bold">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ForgotPassword;
