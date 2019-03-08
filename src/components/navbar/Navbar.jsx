import React from "react";
import { Navbar, Nav, Button, FormControl, InputGroup, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = ({ userInSession, cartCounter, user }) => {
  console.log(user);
  if (userInSession) {
    return (
      <Navbar collapseOnSelect expand="lg" className="nav-bg" sticky="top">
        <Navbar.Brand>
          <Link to="/">
            <img src="./public/images/progeek.png" width="100px" alt="" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto container">
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <InputGroup.Append>
                <Button variant="outline-secondary" className="material-icons">
                  search
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Nav>
          <Nav className="links-nav">
            <Link to="/cart" className="cart-counter">
              {cartCounter}
            </Link>
            <Link to="/cart" className="material-icons marg">
              shopping_cart
            </Link>
            <Link to={`/profile/${user._id}`} className="marg">
              My Profile
            </Link>
            <Link to="/logout" className="marg">
              Logout
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
  return (
    <Navbar collapseOnSelect expand="lg" className="nav-bg" sticky="top">
      <Navbar.Brand>
        <Link to="/">
          <img src="./public/images/progeek.png" width="100px" alt="" />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto container">
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
              <Button variant="outline-secondary" className="material-icons">
                search
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Nav>
        <Nav>
          <Link to="/cart" className="cart-counter">
            {cartCounter}
          </Link>
          <Link to="/cart" className="material-icons marg">
            shopping_cart
          </Link>
          <Link to="/signup" className="marg">
            Signup
          </Link>
          <Link to="/login" className="marg">
            Login
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
