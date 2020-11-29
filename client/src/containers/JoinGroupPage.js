import React from "react";
import InputField from "../components/InputField";
import { Route } from "react-router-dom";
import "../styles/pageStyle.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
export default class JoinGroupPage extends React.Component {
  restaurantsInfo = this.props.location.state.groupData;
  state = {
    groupId: "",
    userName: "",
  };
  handleChange = (event, type) => {
    switch (type) {
      case "name":
        this.setState({ userName: event.target.value });
        break;
      case "url":
        this.setState({ groupId: event.target.value });
        break;
      default:
        break;
    }
  };
  componentDidMount() {
    axios
      .post(`http://localhost:3000/groups/create`, {
        address: this.restaurantsInfo.address,
        city: this.restaurantsInfo.city,
        state: this.restaurantsInfo.stateName,
        zipCode: this.restaurantsInfo.zipCode,
        radius: this.restaurantsInfo.radius,
      })
      .then((res) => {
        this.setState({ groupId: res.data });
      });
  }
  render() {
    return (
      <div className="pageContainer">
        <div className="elementsContainer">
          <h1 className="headers"> Join Event</h1>
          <InputField
            fieldName={"Your Name"}
            fieldValue={this.state.userName}
            HandleChange={(event, type) => {
              this.handleChange(event, "name");
            }}
          />

          <InputField
            fieldName={"Group URL"}
            fieldValue={this.state.groupId}
            HandleChange={(event, type) => {
              this.handleChange(event, "url");
            }}
          />
          {/* Parse groupId from GroupURL input field,then add it to the path as swipe/{groupId} */}
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
                  history.push("/swipe", { URL: this.state });
                }}
              >
                Start Swipping
              </Button>
            )}
          />
        </div>
      </div>
    );
  }
}
