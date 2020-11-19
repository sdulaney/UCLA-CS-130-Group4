import React from "react";
import CreateGroup from "./containers/CreateGroupPage";
import JoinGroupPage from "./containers/JoinGroupPage";
import SwippingPage from "./containers/SwippingPage";
import { BrowserRouter, Route, Link } from "react-router-dom";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route path="/" exact component={CreateGroup} />
          <Route path="/creategroup" component={CreateGroup} />
          <Route path="/joingroup" component={JoinGroupPage} />
          <Route path="/swipe" component={SwippingPage} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
