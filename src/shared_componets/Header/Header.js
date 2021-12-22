import React from "react";
import "./Header.css";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import useAll from "../../hooks/useAll";
import Swal from "sweetalert2";

const Header = () => {
  const { user, logOut } = useAll();
  const activeStyle = {
    color: "#FFDB99",
    fontWeight: "700",
  };
  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FFDB99",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut(true);
      }
    }); //log out confirmation checking popup
  };

  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/home">
            MTM Watches
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} activeStyle={activeStyle} to="/home">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} activeStyle={activeStyle} to="/watches">
                Watches
              </Nav.Link>

              {user ? (
                <>
                  <Nav.Link>
                    <i class="fas fa-user me-2"></i>
                    {user?.displayName.split(" ")[0]}
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    activeStyle={activeStyle}
                    to="/dashboard"
                  >
                    {" "}
                    Dashboard{" "}
                  </Nav.Link>
                  <Button onClick={handleLogOut} variant="transparent">
                    <i className="fas fa-sign-out-alt"></i> Sign Out
                  </Button>
                </>
              ) : (
                <Nav.Link
                  as={NavLink}
                  activeStyle={activeStyle}
                  to="/form/signin"
                >
                  Sign In <i className="fas fa-sign-in-alt"></i>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
