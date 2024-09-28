import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Layout = ({ children }) => {
  const nevigate = useNavigate();
  const [height, setHeight] = useState(0)
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("userLogin"));
    if (!auth) {
      alert("Welcome to Images Backup!! To Avail Services You need to login first !")
      nevigate("/login");
    } 
    const head = document.getElementById("header").offsetHeight
    const footer = document.getElementById("footer").offsetHeight
    setHeight(head + footer)
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <div  id="header">
        <Header />
      </div>
      {/* eslint-disable-next-line */}
      <div
        style={{
          height: `calc(100vh - ${
            height
            // 85
            // headRef?.current?.offsetHeight + footerRef?.current?.offsetHeight
          }px)`,
        }}
       className="overflow-auto"  
      >
        <Container className="">{children}</Container>
      </div>

      <div id="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
