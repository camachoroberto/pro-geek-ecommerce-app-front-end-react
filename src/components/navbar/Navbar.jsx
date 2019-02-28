import React from 'react';
import {
  Navbar,
  Nav,
  Button,
  FormControl,
  InputGroup
} from 'react-bootstrap';

import { Link } from 'react-router-dom';

const NavBar = () => (
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand href="/">
      <img
        src="src/components/navbar/progeek.png"
        width="100px  "
        alt=""
      />
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
        <Link to="/signup">Signup</Link>
        <Link to="/login">
          Login
        </Link>
        <Nav.Link eventKey={3} href="/cart" className="material-icons">
          shopping_cart
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default NavBar;
