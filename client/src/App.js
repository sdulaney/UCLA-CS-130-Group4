import React from "react";
import CreateGroup from "./containers/CreateGroupPage";
import JoinGroupPage from "./containers/JoinGroupPage";
import SwippingPage from "./containers/SwippingPage";

const App = () => {
  return (
    <div>
      <CreateGroup />
      <JoinGroupPage />
      <SwippingPage />
    </div>
  );
};

export default App;
