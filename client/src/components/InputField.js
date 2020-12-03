/*
    USAGE
    1- import InputField from '<PATH>'
    
    2- <InputField fieldName={<field name here as a string>} />
    ex: <InputField fieldName={"Username"} />
*/

import React from "react";
import "../styles/InputField.css";
export default class InputField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { field: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ field: event.target.value });
  }
  handleSubmit(event) {
    //Post to API code goes here
    event.preventDefault();
  }
  render() {
    return (
      <div data-placeholder="data-placeholder">
        <h3 className="input">{this.props.fieldName} </h3>
        <form onSubmit={this.handleSubmit}>
          <input
            className="inputfield"
            type="text"
            value={this.props.fieldValue}
            onChange={this.props.HandleChange}
          />
        </form>
      </div>
    );
  }
}
