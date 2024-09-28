import React, { useEffect, useState } from "react";
// import { Image } from "cloudinary-react";
import { useDispatch, useSelector } from "react-redux";
import { getImages } from "../redux/reducers/getImageReducer";
import Loader from "../components/Loader";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { delImage } from "../redux/reducers/deleteImage";

export default function Home() {
  const [imageIds, setImageIds] = useState([]);
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  const { images } = useSelector((state) => state);
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("userLogin"));
    if (auth?._id) {
      dispatch(getImages(auth._id));
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    // eslint-disable-next-line
    setImageIds(images.data || []);
  }, [images]);

  const handleClick = (url) => {
    window.open(`${url}`, "_blank");
  };

  const handleDelete = ({ public_id, _id, userId }) => {
    const cnf = window.confirm("Are you sure to delete this image?");
    if (cnf) {
      dispatch(delImage({ public_id, id: _id, userId }));
      const filtered = imageIds.filter((item) => item._id !== _id);
      setImageIds(filtered);
    }
  };

  const handleDownloadImage = (e, url) => {
    e.preventDefault();
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "image.jpg";
        link.click();
        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading image:", error);
      });
  };
  return (
    <>
      {images.isLoading ? (
        <Loader />
      ) : (
        <div
        className="gallery w-100"
        style={{
          display: "grid",
          gridGap: "16px", // Spacing between images
          gridTemplateColumns:
            imageIds.length > 12 ? "repeat(5, 1fr)" : "repeat(4, 1fr)",
          padding: "20px", // Adds padding around the gallery
          height: "300px",
        }}
      >
        {imageIds && imageIds.length > 0 ? (
          imageIds.map((imageId, index) => (
            <div
              className="gallery-image overflow-hidden"
              key={index}
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "8px", // Rounded corners for a smooth look
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
                transition: "transform 0.3s ease", // Smooth zoom effect
              }}
            >
              <img
                src={imageId.image_url}
                onClick={() => handleClick(imageId.image_url)}
                alt="user images"
                style={{
                  width: "100%", // Ensure images fill the grid space
                  height: "100%", // Maintain aspect ratio
                  objectFit: "cover", // Crop images to fit without distortion
                  transition: "transform 0.3s ease-in-out", // Smooth scaling on hover
                }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")} // Zoom in on hover
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")} // Zoom out on mouse leave
              />
           
      
                {/* <Image
                  cloudName={"dsdcsntrd"}
                  publicId={imageId.public_id}
                  width="300"
                  height="170"
                  crop="scale"
                 
                /> */}
                <div className="buttons">
                  {/* <a href={imageId.image_url} download="test.jpg"> */}
                  <Button
                    className="cust-btn-sty fw-bold"
                    onClick={(e) => handleDownloadImage(e, imageId.image_url)}
                  >
                    Download
                  </Button>
                  {/* </a> */}
                  <Button
                    className="cust-btn-sty fw-bold"
                    onClick={() => handleDelete(imageId)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center w-100 py-5">
              Empty Gallary. <br />
              <Button
                variant="dark"
                className="my-2"
                onClick={() => nevigate("/upload")}
              >
                Upload your images
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
