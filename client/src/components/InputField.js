/*
    Usage:-
    <InputField fieldName={<name here as a string>}/>

    Ex:
    <InputField fieldName={"Password"}/>
*/

import React from "react";
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
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>{this.props.fieldName} : </label>
          <input
            type="text"
            value={this.state.field}
            onChange={this.handleChange}
          />
        </form>
      </div>
    );
  }
}
