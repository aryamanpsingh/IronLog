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
                The HTML5 video element uses an mp4 video as a source. Change
                the source video to add in your own background! The header text
                is vertically centered using flex utilities that are build into
                Bootstrap 4.
              </p>
              <p>
                The overlay color can be changed by changing the{" "}
                <code>background-color</code> of the <code>.overlay</code>{" "}
                className in the CSS.
              </p>
              <p>
                Set the mobile fallback image in the CSS by changing the
                background image of the header element within the media query at
                the bottom of the CSS snippet.
              </p>
              <p className="mb-0">
                Created by{" "}
                <a href="https://startbootstrap.com">Start Bootstrap</a>
              </p>
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
