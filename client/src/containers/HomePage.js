import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "../styles/pageStyle.css";
import "../styles/homePage.css";
import "../styles/InputField.css";

const HomePage = () => {
  return (
    <div className="pageContainer">
      <div className="textContainer ">
        <h2 className="text">
          <em style={{ color: "red" }}>Chicken Tinder</em> allows you to save
          time when finding restaurants in groups.{" "}
        </h2>
        <h2 className="text" style={{ fontSize: 28 }}>
          Try it today!
        </h2>
      </div>
      <div>
        <div className="createNewGroup">
          <h2>Create Group</h2>
          <Link to="/creategroup">
            <Button className="ButtonStyle">Create</Button>
          </Link>
        </div>
        <div className="joinGroup">
          <h2>Join Existing Group</h2>
          <Link to="/joingroup">
            <Button className="ButtonStyle">Join</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
