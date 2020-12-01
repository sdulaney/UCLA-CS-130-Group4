import React from "react";
import InputField from "../components/InputField";
import { Link } from "react-router-dom";
import "../styles/pageStyle.css";
import Button from "react-bootstrap/Button";
const JoinGroupPage = () => {
  return (
    <div className="pageContainer">
      <div className="elementsContainer">
        <h1 className="headers"> Join Event</h1>
        <InputField fieldName={"Your Name"} />
        <InputField fieldName={"Group URL"} />
        {/* Parse groupId from GroupURL input field,then add it to the path as swipe/{groupId} */}
        <Link to="/swipe">
          <Button className="ButtonStyle"
            style={{
              paddingLeft: 30,
              paddingRight: 30,
              margin: 75,
              color: "white"
            }}
            // variant="contained"
            variant="outline-light"
            size="medium"
            onSubmit={() => { }}
          >
            Start Swipping
          </Button>
        </Link>
      </div>
    </div >
  );
};

export default JoinGroupPage;
