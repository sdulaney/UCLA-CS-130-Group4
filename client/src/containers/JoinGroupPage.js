import React from "react";
import InputField from "../components/InputField";
import DropdownField from "../components/DropdownField";
import { us_states } from "../config";
import "../styles/pageStyle.css";
import Button from "react-bootstrap/Button";
const JoinGroupPage = () => {
  return (
    <div className="pageContainer">
      <div className="elementsContainer">
        <h1 className="headers"> Join Event</h1>
        <InputField fieldName={"Your Name"} />
        <InputField fieldName={"Group URL"} />

        <Button
          style={{
            paddingLeft: 50,
            paddingRight: 50,
            margin: 30,
          }}
          variant="primary"
        >
          Start Swipping
        </Button>
      </div>
    </div>
  );
};

export default JoinGroupPage;
