import React from "react";
import CreateGroup from "./containers/CreateGroupPage";
import JoinGroupPage from "./containers/JoinGroupPage";
import SwippingPage from "./containers/SwippingPage";
import { BrowserRouter, Route } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const App = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Chicken Tinder</Navbar.Brand>
        <div style={{ marginLeft: 1000 }}>
          <Nav className="mr-auto">
            <Nav.Link
              style={{ fontSize: 20, color: "white" }}
              href="/creategroup"
            >
              Create
            </Nav.Link>
            <Nav.Link
              style={{ fontSize: 20, color: "white" }}
              href="/joingroup"
            >
              Join
            </Nav.Link>
          </Nav>
        </div>
      </Navbar>
      <div>
        <BrowserRouter>
          <div>
            <Route path="/" exact component={CreateGroup} />
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
