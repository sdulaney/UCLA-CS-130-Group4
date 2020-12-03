import React from "react";
import ReactDOM from "react-dom";
import SwippingPage from "../containers/SwippingPage";
import { render } from "@testing-library/react";
it("renders SwippingPage without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SwippingPage></SwippingPage>, div);
});
