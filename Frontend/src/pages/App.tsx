import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./auth/Login";
import Register from "./auth/Register";

import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <span> Landing page </span>
        </Route>
        <Route exact path="/login" render={Login} />
        <Route exact path="/register" render={Register} />
        <Route path="*">
          <span> 404 page </span>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
