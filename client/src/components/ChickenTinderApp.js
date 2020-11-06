import React from "react";
import Action from "./Action";
import Header from "./Header";
import InputField from "./InputField";

export default class ChickenTinderApp extends React.Component {
  render() {
    return (
      <div>
        <h1>ChickenTinderApp</h1>
        <InputField fieldName={"User Name"} />
      </div>
    );
  }
}
