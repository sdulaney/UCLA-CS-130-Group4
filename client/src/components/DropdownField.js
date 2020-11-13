/*
    USAGE
    1- import DropdownField from '<PATH>'
    
    2- <DropdownField inputList={<Array of strings>} fieldName={<field name here as a string>} />
    ex: <DropdownField inputList={["Item1", "Item2", "Item3"]} fieldName={"Items List"} />
*/

import React from "react";
import "../styles/InputField.css";
export default class DropdownField extends React.Component {
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
      <div className="container">
        <h3 className="input">{this.props.fieldName} </h3>
        <form onSubmit={this.handleSubmit}>
          <select
            className={"inputfield"}
            value={this.state.field}
            onChange={this.handleChange}
          >
            {this.props.inputList.map((x) => (
              <option value={x}>{x}</option>
            ))}
          </select>
        </form>
      </div>
    );
  }
}
