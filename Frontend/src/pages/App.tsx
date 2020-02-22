import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "pages/auth/Login";
import Register from "pages/auth/Register";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <span> Landing page </span>
        </Route>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route path="*">
          <span> 404 page </span>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
