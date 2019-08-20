import React, { Component, Fragment } from "react";
import Header from "../layout/header";

export class Confirm extends Component {
  render() {
    const { values, handleSubmit, prevStep } = this.props;
    let { step, workout } = values;
    return (
      <Fragment>
        <Header />
        <div className="workout-form">
          <div className="form-title">Confirm Submission</div>
          <div className="form-group">
            <button onClick={handleSubmit} className="submit">
              Submit
            </button>
          </div>
          <div className="form-group">
            <button onClick={prevStep} className="previous">
              Previous
            </button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Confirm;
