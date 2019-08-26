import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import Header from "../layout/header";
import Footer from "../layout/footer";
import { Provider } from "react-redux";
import store from "../../store";
import { Link } from "react-router-dom";
export default function Index() {
  return (
    <Provider store={store}>
      <header>
        <Fragment>
          <Header />
        </Fragment>
        <div className="header-container">
          <div className="menu-container rounded">
            <div className="view">
              <Link to="/add">
                <div className="button">
                  <img
                    src="static/frontend/images/noteicon.png"
                    className="menu-icon"
                  />
                </div>
              </Link>
            </div>
            <div className="create">
              <Link to="/list">
                <div className="button">
                  <img
                    src="static/frontend/images/viewicon.png"
                    className="menu-icon"
                  />
                </div>
              </Link>
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
      <Footer />
    </Provider>
  );
}
