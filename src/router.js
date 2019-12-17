import React from "react";
import { Router, Route } from "dva/router";
import Login from "./routes/Login";
import Main from "./routes/Main";

function RouterConfig({ history }) {
  return (
    <div>
      <Router history={history}>
        <Route path="/" component={Login} />
        <Route path="/user" component={Login} />
        <Route path="/main" component={Main} />
      </Router>
    </div>
  );
}

export default RouterConfig;