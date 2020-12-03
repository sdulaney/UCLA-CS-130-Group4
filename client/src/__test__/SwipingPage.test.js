import React from "react";
import ReactDOM from "react-dom";
import SwipingPage from "../containers/SwipingPage";
it("renders SwipingPage without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SwipingPage></SwipingPage>, div);
});
