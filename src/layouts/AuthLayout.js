import React, {useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Footer from "../components/Footer";
import LoginHeader from "../components/LoginHeader";

const AuthLayouts = ({ children }) => {
  const [height, setHeight] = useState(0)
  useEffect(() => {
    const head = document.getElementById("header").offsetHeight
    const footer = document.getElementById("footer").offsetHeight
    setHeight(head + footer)
  },[])
  return (
    <div>
      <div id="header">
        <LoginHeader />
      </div>
      <Container
        style={{
          height: `calc(100vh - ${height
          }px)`,
        }}
      >
        {children}
      </Container>
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
};

export default AuthLayouts;
