import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import LoginForm from "../forms/login";
import { Provider } from "react-redux";
import store from "../../store";
import Footer from "../layout/footer";

export default function Login() {
  return (
    <Provider store={store}>
      <Fragment>
        <header>
          <div className="main-container">
            <div className="right-container rounded">
              <div className="login-form rounded">
                <div className="logo">
                  <img
                    src="/static/frontend/images/logo.png"
                    alt="logo"
                    className="mx-auto"
                  />
                </div>
                <LoginForm />
              </div>
            </div>
          </div>
        </header>
      </Fragment>
    </Provider>
  );
}
