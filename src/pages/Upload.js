import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadImages } from "../redux/reducers/uploadImage";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Row, Alert, Card } from "react-bootstrap";
import Loader from "../components/Loader";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons';

const dropzoneStyle = {
  width: "100%",
  height: "200px",
  border: "2px dashed #007bff", // Updated color
  backgroundColor: "#f9f9f9",   // Soft background color
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  borderRadius: "10px",
  transition: "background-color 0.3s ease", // Smooth transition on hover
};

const dropzoneActiveStyle = {
  ...dropzoneStyle,
  backgroundColor: "#e0f7ff", // Slightly darker background on drag
  borderColor: "#00aaff", // Brighter blue
};

export default function Upload() {
  const { upload } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const auth = JSON.parse(localStorage.getItem("userLogin"));
      const file = acceptedFiles[0];
      const validTypes = ["image/png", "image/jpg", "image/jpeg"];

      if (validTypes.includes(file?.type)) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
          if (auth) {
            dispatch(
              uploadImages({
                source: reader.result,
                id: auth._id,
                push: navigate,
              })
            )
              .then(() => {
                setSuccessMessage("Image uploaded successfully!");
                setErrorMessage("");
              })
              .catch((error) => {
                setErrorMessage("Error uploading the image.");
              });
          }
        };

        reader.onerror = () => {
          console.error("Error reading the file.");
          setErrorMessage("There was an issue reading the file.");
        };
      } else {
        setErrorMessage(
          "This file type is not supported. Please upload a PNG, JPG, or JPEG file."
        );
      }
    } else {
      setErrorMessage("No files were selected.");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return upload.isLoading ? (
    <Loader />
  ) : (
    <div className="py-4">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="shadow-sm p-4" style={{ borderRadius: "10px" }}>
            <div
              {...getRootProps()}
              style={isDragActive ? dropzoneActiveStyle : dropzoneStyle}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p style={{ color: "#007bff" }}>Drop the files here...</p>
              ) : (
                <p style={{ color: "#007bff" }}>
                  Drag and drop files here, or click to select files
                </p>
              )}
            </div>
            {errorMessage && (
              <Alert variant="danger" className="mt-4 text-center">
                {errorMessage}
              </Alert>
            )}
            {successMessage && (
              <Alert variant="success" className="mt-4 text-center">
                {successMessage}
              </Alert>
            )}
            <Button
              variant="primary"
              className="mt-4 w-100"
              style={{
                backgroundColor: "#007bff",
                border: "none",
                padding: "10px 0",
                fontWeight: "bold",
                fontSize: "16px",
              }}
              onClick={() => navigate("/")}
            >
              View Uploaded Images
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
