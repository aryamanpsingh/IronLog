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
import List from "./Workout/list";
import Login from "./pages/login";
import Register from "./pages/register";
import { loadUser } from "../actions/users";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
    console.log("disp");
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <PrivateRoute exact path="/" component={Index} />
            <Route exact path="/list" component={List} />
            <Route exact path="/add" component={Add} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("app"));
