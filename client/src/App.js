import React, { Fragment } from "react";
import Landing from "./components/Landing";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

const App = () => (
  <Router>
    <Fragment>
      <Route exact path="/" component={Landing} />
    </Fragment>
  </Router>
);

export default App;
