import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import Header from "../layout/header";
import { Provider } from "react-redux";
import store from "../../store";
import { Link } from "react-router-dom";
export default function Index() {
  return (
    <Provider store={store}>
      <Fragment>
        <Header />
      </Fragment>
      <header>
        <div className="overlay" />
        <picture>
          <source srcSet="/static/frontend/images/back.png" type="image/png" />
          <img src="/static/frontend/images/back.png" />
        </picture>
        <div className="container h-100">
          <div className="d-flex h-100 text-center align-items-center">
            <div className="w-100 text-white">
              <h1 className="display-3">IronLog</h1>
              <p className="lead mb-0">
                <Link to="/list">
                  <button className="btn btn-dark btn-large">View</button>
                </Link>
                <Link to="/add">
                  <button className="btn btn-dark btn-large">Create</button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="my-5">
        <div className="container">
          <div className="row">
            <div className="col-md-8 mx-auto">
              <p>
                Lifting weights is fun, keeping track of the weights you lift
                isn’t. IronLog was conceptualized as a non-intrusive workout
                tracker which allowis you to record your gym progression with
                minimal mental effort.
              </p>
              <p>
                This tool doesn’t look to inundate users with fancy features, it
                aims to provide notebook style convenience without actually
                needing one.
              </p>
              <p className="mb-0" />
            </div>
          </div>
        </div>
      </section>

      {/*<div className="container">
        <Link to="/list">
          <h1>View Workouts</h1>
        </Link>
        <Link to="/add">
          <h1>Add Workouts</h1>
        </Link>
  </div>*/}
    </Provider>
  );
}
