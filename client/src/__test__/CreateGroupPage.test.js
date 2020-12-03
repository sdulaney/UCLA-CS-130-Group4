import React from "react";
import ReactDOM from "react-dom";
import CreateGroupPage from "../containers/CreateGroupPage";
import { BrowserRouter } from "react-router-dom";

it("renders CreateGroupPage without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <CreateGroupPage></CreateGroupPage>
    </BrowserRouter>,
    div
  );
});
