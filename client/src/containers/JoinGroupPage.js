import React from "react";
import InputField from "../components/InputField";
import { Route } from "react-router-dom";
import "../styles/pageStyle.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
export default class JoinGroupPage extends React.Component {
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
    //const restaurantsInfo = this.props.location.state.groupData;
    try {
      axios
        .post(`http://localhost:3000/groups/create`, {
          address: this.props.location.state.groupData.address,
          city: this.props.location.state.groupData.city,
          state: this.props.location.state.groupData.stateName,
          zipCode: this.props.location.state.groupData.zipCode,
          radius: this.props.location.state.groupData.radius,
        })
        .then((res) => {
          this.setState({ groupId: res.data });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {}
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
