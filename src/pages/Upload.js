import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadImages } from "../redux/reducers/uploadImage";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, Row } from "react-bootstrap";
import Loader from "../components/Loader";
import { useDropzone } from "react-dropzone";

const dropzoneStyle = {
  width: "100%",
  height: "200px",
  border: "2px dashed #cccccc",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
};

export default function Upload() {
  const { upload } = useSelector((state) => state);
  const nevigate = useNavigate();
  const dispstch = useDispatch();

  // ===============
  const onDrop = (acceptedFiles) => {
    if (acceptedFiles) {
      const auth = JSON.parse(localStorage.getItem("userLogin"));
      let file = acceptedFiles[0];
      let vald = ["image/png", "image/jpg", "image/jpeg"];
      if (vald.includes(file?.type)) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          if (auth) {
            dispstch(
              uploadImages({
                source: reader.result,
                id: auth._id,
                push: nevigate,
              })
            );
          }
        };
        reader.onerror = () => {
          console.error("AHHHHHHHH!!");
        };
      } else {
        alert("This file is not supported !");
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return upload.isLoading ? (
    <Loader />
  ) : (
    <div className="py-4">
      <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here...</p>
        ) : (
          <p>Drag and drop files here, or click to select files</p>
        )}
      </div>
    </div>
  );
}
