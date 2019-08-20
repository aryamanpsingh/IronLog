import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import store from "../store";
import { Provider } from "react-redux";
import PrivateRoute from "./common/PrivateRoute";
import {
  HashRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";
import Index from "./index";
import Add from "./Workout/add";
import Login from "./pages/login";
import Register from "./pages/register";
import RoutineForm from "./Routine/RoutineForm";
import List from "./Routine/List";
import { loadUser } from "../actions/users";
import $ from "jquery";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
    console.log("disp");
    window.$('[data-toggle="tooltip"]').tooltip();
  }
  componentDidUpdate() {
    $('[data-toggle="tooltip"]').tooltip();
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <PrivateRoute exact path="/" component={Index} />
            <PrivateRoute exact path="/list" component={List} />
            <PrivateRoute exact path="/add" component={RoutineForm} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("app"));
