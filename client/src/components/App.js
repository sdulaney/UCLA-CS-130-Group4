import React from "react";
import InputField from "./InputField";
import DropdownField from "./DropdownField";
import { us_states } from "../config";
const App = () => {
  return (
    <div>
      <InputField fieldName={"test 1"}></InputField>
      <DropdownField inputList={us_states} fieldName={"test 2"}></DropdownField>
    </div>
  );
};

export default App;
