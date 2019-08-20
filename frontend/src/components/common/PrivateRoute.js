import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Fragment } from "react";
const PrivateRoute = ({ component: Component, routes, user, ...rest }) => (
  <Fragment>
    {user.isAuthenticated != null ? (
      <Route
        {...rest}
        render={props => {
          console.log("THIS IS");
          if (user.isLoading) {
            return <h2>Loading...</h2>;
          } else if (user.isAuthenticated) {
            return <Component {...props} />;
          } else {
            return (
              <Redirect
                to={{ pathname: "/login", state: { from: props.location } }}
              />
            );
          }
        }}
      />
    ) : null}
  </Fragment>
);

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(PrivateRoute);
