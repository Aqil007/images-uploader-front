import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const nevigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    localStorage.removeItem("userLogin");
    nevigate("/login");
  };
  return (
    <div>
      <Navbar bg="dark" expand="lg">
        <Container>
          <Link to={"/"} className="text-light nav-link">
            {" "}
            <h4 className="text-light">
  <FontAwesomeIcon icon={faCloudDownloadAlt} />  Upload Images</h4>{" "}
          </Link>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="bg-light"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <div  
              className="navItem"
              style={{
                    borderBottom:
                      location.pathname === "/" ? "2px solid #fff" : "none",
                  }}>
                <Link
                  to={"/"}
                  className="text-light nav-link fw-bold pb-0"
                 
                >
                  Gallery
                </Link>
              </div>
              <div
              className="navItem"
               style={{
                    borderBottom:
                      location.pathname === "/upload"
                        ? "2px solid #fff"
                        : "none",
                  }}>
                <Link
                  to={"/upload"}
                  className="text-light nav-link fw-bold pb-0"
                  
                >
                  Upload
                </Link>
              </div>
              <div>
                <Button
                  variant="light"
                  size="sm"
                  className="fw-bold logout-btn"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
