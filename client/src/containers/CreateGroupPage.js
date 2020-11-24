import React from "react";
import InputField from "../components/InputField";
import DropdownField from "../components/DropdownField";
import { us_states } from "../config";
import "../styles/pageStyle.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
const CreateGroup = () => {
  return (
    <div>
      <div className="pageContainer">
        <div className="elementsContainer">
          <h1 className="headers"> Create Event</h1>
          <InputField placeholder='Username' fieldName={"Your Name"} />
          <InputField fieldName={"Street Address"} />
          <InputField fieldName={"City"} />
          <DropdownField inputList={us_states} fieldName={"State"} />
          <InputField fieldName={"Zip Code"} />
          <InputField fieldName={"Max Radius"} />

          <Link to="/joingroup">
            <Button className="ButtonStyle"
              style={{
                paddingLeft: 30,
                paddingRight: 30,
                margin: 75,
                color: "white"
              }}
              // variant="contained"
              variant="secondary"
              size="medium"
              onSubmit={() => { }}
            >
              Create Group
            </Button>
          </Link>
        </div>
      </div>
    </div >
  );
};

export default CreateGroup;
