import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import RegisterUser from "../forms/register";

import { Provider } from "react-redux";
import store from "../../store";

export default function Register() {
  return (
    <Provider store={store}>
      <Fragment>
        <header>
          <div className="main-container">
            <div className="center-container">
              <div className="register-form">
                <div className="logo">
                  <img src="/static/frontend/images/logo.png" alt="logo" />
                </div>
                <RegisterUser />
              </div>
            </div>
          </div>
        </header>
      </Fragment>
    </Provider>
  );
}
