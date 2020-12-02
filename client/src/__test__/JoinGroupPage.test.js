import React from "react";
import ReactDOM from "react-dom";
import JoinGroupPage from "../containers/JoinGroupPage";
import { BrowserRouter } from "react-router-dom";
it("renders JoinGroupPage without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <JoinGroupPage></JoinGroupPage>
    </BrowserRouter>,
    div
  );
});
