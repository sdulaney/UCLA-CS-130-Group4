import React from "react";
import InputField from "../components/InputField";
import DropdownField from "../components/DropdownField";
import { us_states } from "../config";
import "../styles/pageStyle.css";
import Button from "react-bootstrap/Button";
import { Route } from "react-router-dom";
import axios from "axios";

export default class CreateGroup extends React.Component {
  state = {
    name: "",
    address: "",
    city: "",
    stateName: "",
    radius: "",
    zipCode: "",
  };
  // Fix unmounting components

  // handleSubmit = (event) => {
  //   event.preventDefault();

  //   axios
  //     .post(`http://localhost:3000/groups/create`, {
  //       address: this.state.address,
  //       city: this.state.city,
  //       state: this.state.stateName,
  //       zipCode: this.state.zipCode,
  //       radius: this.state.radius,
  //     })
  //     .then((res) => {
  //       // console.log(res);
  //       this.setState({ groupId: res.data });
  //     });
  // };
  handleChange = (event, type) => {
    switch (type) {
      case "address":
        this.setState({ address: event.target.value });
        break;
      case "city":
        this.setState({ city: event.target.value });
        break;
      case "zipCode":
        this.setState({ zipCode: event.target.value });
        break;
      case "radius":
        this.setState({ radius: event.target.value });
        break;
      case "stateName":
        this.setState({ stateName: event.target.value });
        break;
      case "name":
        this.setState({ name: event.target.value });
        break;
      default:
        break;
    }
  };
  render() {
    return (
      <div>
        <div className="pageContainer">
          <div className="elementsContainer">
            <Button
              // onClick={() => handleSubmit}
              onClick={() => {
                axios
                  .post(
                    "http://localhost:3000/join/4d7705dd-380d-41ea-a47d-f7aea0d3b3a4/gamal"
                  )
                  .then(function (response) {
                    console.log(response);
                    console.log(JSON.parse(response.data.restaurantList[0]));
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              }}
            >
              JOIN
            </Button>
            <h1 className="headers"> Create Event</h1>
            <InputField
              placeholder="Username"
              fieldName={"Your Name"}
              fieldValue={this.state.name}
              HandleChange={(event, type) => {
                this.handleChange(event, "name");
              }}
            />
            <InputField
              fieldName={"Street Address"}
              fieldValue={this.state.address}
              HandleChange={(event, type) => {
                this.handleChange(event, "address");
              }}
            />
            <InputField
              fieldName={"City"}
              fieldValue={this.state.city}
              HandleChange={(event, type) => {
                this.handleChange(event, "city");
              }}
            />
            <DropdownField
              inputList={us_states}
              fieldName={"State"}
              fieldValue={this.state.stateName}
              HandleChange={(event, type) => {
                this.handleChange(event, "stateName");
              }}
            />
            <InputField
              fieldName={"Zip Code"}
              fieldValue={this.state.zipCode}
              HandleChange={(event, type) => {
                this.handleChange(event, "zipCode");
              }}
            />
            <InputField
              fieldName={"Max Radius"}
              fieldValue={this.state.radius}
              HandleChange={(event, type) => {
                this.handleChange(event, "radius");
              }}
            />
            <Route
              render={({ history }) => (
                <Button
                  className="ButtonStyle"
                  style={{
                    paddingLeft: 30,
                    paddingRight: 30,
                    margin: 75,
                    color: "white",
                  }}
                  variant="secondary"
                  size="medium"
                  onClick={(event) => {
                    //this.handleSubmit(event);
                    history.push("/joingroup", { groupData: this.state });
                  }}
                >
                  Create Group
                </Button>
              )}
            />
          </div>
        </div>
      </div>
    );
  }
}
