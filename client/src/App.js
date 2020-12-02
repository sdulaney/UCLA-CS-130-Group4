import React from "react";
// import { render } from 'react-dom';
import CreateGroup from "./containers/CreateGroupPage";
import JoinGroupPage from "./containers/JoinGroupPage";
import SwippingPage from "./containers/SwippingPage";
import { BrowserRouter, Route } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HomePage from "./containers/HomePage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDrumstickBite } from "@fortawesome/free-solid-svg-icons";

// import {
//   faDrumstickBite

// } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  // render()
  return (
    <div>
      <Navbar className="color-nav" fixed="top" bg="bg-dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Navbar.Brand href="/">
            <FontAwesomeIcon className="iconStyleLogo" icon={faDrumstickBite} />
            Chicken Tinder
          </Navbar.Brand>
        </Navbar.Collapse>

        <div style={{ marginLeft: 50 }}>
          <Nav className="mr-auto">
            {/* <Nav className="navbar navbar-default navbar-fixed-top"> */}
            <Nav.Link
              style={{ fontSize: 20, color: "white" }}
              href="/creategroup"
            >
              <Button variant="outline-light">Create</Button>
            </Nav.Link>
            <Nav.Link
              style={{ fontSize: 20, color: "white" }}
              href="/joingroup"
            >
              <Button variant="outline-light">Join</Button>
            </Nav.Link>
          </Nav>
        </div>
      </Navbar>
      <div>
        <BrowserRouter>
          <div>
            <Route path="/" exact component={HomePage} />
            <Route path="/creategroup" component={CreateGroup} />
            <Route path="/joingroup" component={JoinGroupPage} />
            <Route path="/swipe" component={SwippingPage} />
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
