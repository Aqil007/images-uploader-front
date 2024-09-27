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
            gridTemplateColumns:
              imageIds.length > 12 ? "repeat(5, 1fr)" : "repeat(4, 1fr)",
          }}
        >
          {imageIds && imageIds.length > 0 ? (
            imageIds.map((imageId, index) => (
              <div className=" gallery-image overflow-hidden" key={index}>
                <img
                  src={imageId.image_url}
                  onClick={() => handleClick(imageId.image_url)}
                  alt="user images"
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
