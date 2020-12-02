import React from "react";
import InputField from "../components/InputField";
import DropdownField from "../components/DropdownField";
import { us_states } from "../config";
import "../styles/pageStyle.css";
import Button from "react-bootstrap/Button";
import { Route } from "react-router-dom";

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
        this.setState({
          radius:
            event.target.value > 20
              ? "max radius is 20 miles"
              : event.target.value,
        });
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
            <h1 className="headers"> Create Event</h1>

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
              fieldName={"Radius"}
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
