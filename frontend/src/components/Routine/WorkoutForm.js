import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import Header from "../layout/header";
import { Provider } from "react-redux";
import ReactTooltip from "react-tooltip";
import Footer from "../layout/footer";

export class WorkoutForm extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    console.log(this.state);
    const { values, handleChange, addExercise } = this.props;
    let { step, workout } = values;
    let { name, exercise } = workout[step - 2];
    console.log(name);
    return (
      <React.Fragment>
        <div className="workoutform-container">
          <ReactTooltip />
          <Header />
          <div className="header-container">
            <div className="workout-form rounded">
              <div className="form-title">
                Add Workout ({step - 1} of {values.length})
              </div>
              <form id="workout">
                <div className="form-group">
                  <label htmlFor="workout">Name</label>
                  <input
                    type="text"
                    name="workoutname"
                    id="workoutname"
                    onChange={handleChange()}
                    value={name}
                    className="form-control"
                  />
                </div>

                {exercise.map((val, idx) => {
                  let exerciseId = `exercise-${idx}`,
                    setsId = `sets-${idx}`,
                    repsId = `reps-${idx}`,
                    weightsId = `weights-${idx}`;
                  return (
                    <div key={idx} className="card">
                      <div className="form-group">
                        <label htmlFor={exerciseId}>{`Exercise #${idx +
                          1}`}</label>
                        <input
                          type="text"
                          name="name"
                          data-id={idx}
                          id={exerciseId}
                          className="form-control"
                          value={exercise[idx].name}
                          onChange={handleChange(exercise[idx].name)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor={setsId}>Sets</label>
                        <input
                          type="text"
                          name="sets"
                          data-id={idx}
                          id={setsId}
                          className="form-control sets"
                          value={exercise[idx].sets}
                          data-place="bottom"
                          data-tip="# of sets in this exercise"
                          data-event="focus"
                          onChange={handleChange(exercise[idx].sets)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor={setsId}>Reps</label>
                        <input
                          type="text"
                          name="reps"
                          data-id={idx}
                          id={repsId}
                          className="form-control reps"
                          value={exercise[idx].reps}
                          data-place="bottom"
                          data-tip="# of reps per set, separated by commas (eg. 8,10,12)"
                          data-event="focus"
                          onChange={handleChange(exercise[idx].reps)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor={weightsId}>Weights</label>
                        <input
                          type="text"
                          name="weights"
                          data-id={idx}
                          id={weightsId}
                          className="form-control weights"
                          value={exercise[idx].weights}
                          data-place="top"
                          data-tip="Weights per set, separated by commas (eg. 135,225,305)"
                          data-event="focus"
                          onChange={handleChange(exercise[idx].weights)}
                        />
                      </div>
                      <button onClick={addExercise} className="btn btn-primary">
                        +
                      </button>
                    </div>
                  );
                })}
                <div className="row">
                  <div className="col">
                    <button
                      type="submit"
                      className="btn btn-warning"
                      onClick={this.props.prevStep}
                    >
                      Previous
                    </button>
                  </div>
                  <div className="col">
                    <button
                      type="submit"
                      className="btn btn-warning"
                      onClick={this.props.continue}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

const styles = {
  button: {
    margin: 15
  }
};

export default WorkoutForm;
