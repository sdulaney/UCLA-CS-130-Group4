import React from "react";
import ReactDOM from "react-dom";
import HomePage from "../containers/HomePage";
import { BrowserRouter } from "react-router-dom";

import { render } from "@testing-library/react";
it("renders HomePage without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <HomePage></HomePage>
    </BrowserRouter>,
    div
  );
});
