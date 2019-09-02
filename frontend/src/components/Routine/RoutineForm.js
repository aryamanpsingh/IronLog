import React, { Component } from "react";
import WorkoutForm from "./WorkoutForm";
import Confirm from "./Confirm";
import Success from "./Success";
import Header from "../layout/header";
import update from "immutability-helper";
import { addRoutine } from "../../actions/routine";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import store from "../../store";
import ReactTooltip from "react-tooltip";
import { Redirect, Link } from "react-router-dom";
import Footer from "../layout/footer";

export class RoutineForm extends Component {
  static propTypes = {
    addRoutine: PropTypes.func.isRequired
  };
  state = {
    step: 1,
    name: "",
    length: "",
    workout: [
      { name: "", exercise: [{ name: "", sets: "", reps: "", weights: "" }] }
    ],
    submitted: false
  };
  initialState = {
    step: 1,
    name: "",
    length: "",
    workout: [
      { name: "", exercise: [{ name: "", sets: "", reps: "", weights: "" }] }
    ],
    submitted: false
  };
  componentDidMount() {
    if (this.state.submitted) {
      this.setState(this.initialState);
    }
  }
  addWorkout = e => {
    e.preventDefault();
    this.setState(prevState => ({
      step: prevState.step + 1,
      workout: [
        ...prevState.workout,
        { name: "", exercise: [{ name: "", sets: "", reps: "", weights: "" }] }
      ]
    }));
  };
  addExercise = e => {
    e.preventDefault();
    console.log(this.state);

    const workout = this.state.workout[this.state.step - 2];
    let exercise = workout.exercise;
    this.setState(prevState => ({
      /*
      workout: [{
          [this.state.step - 2]: {
            name: workout.name,
            exercise: [
              ...exercise,
              { name: "", sets: "", reps: "", weights: "" }
            ]
          }
        }
      ]*/
      workout: update(this.state.workout, {
        [this.state.step - 2]: {
          name: { $set: workout.name },
          exercise: {
            $set: [...exercise, { name: "", sets: "", reps: "", weights: "" }]
          }
        }
      })
    }));
  };
  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };
  continue = e => {
    console.log("continue");
    e.preventDefault();
    if (this.state.step > 1 && this.state.step - 1 < this.state.length) {
      console.log("addworkout");
      this.addWorkout(e);
    }
    this.nextStep();
  };
  // Handle fields change
  handleSubmit = e => {
    let { name, workout, length } = this.state;
    let reps = [];
    let weights = [];
    let array_workout = [
      { name: "", exercise: [{ name: "", sets: "", reps: "", weights: "" }] }
    ];
    workout.forEach(function(value, index) {
      array_workout[index] = value;
      let array_exercise = [{ name: "", sets: "", reps: [], weights: [] }];
      let exercise = value.exercise;
      exercise.forEach(function(val, idx) {
        reps[idx] = val["reps"].split(",");
        weights[idx] = val["weights"].split(",");
        array_exercise[idx] = {
          name: val["name"],
          sets: val["sets"],
          reps: reps[idx],
          weights: weights[idx]
        };
      });
      exercise = array_exercise;
      if (exercise != null) array_workout[index].exercise = exercise;
    });
    workout = array_workout;
    const submission = { name, workout, length };
    console.log(submission);
    this.props.addRoutine(submission);
    this.setState(this.initialState);
    /*
    this.props.addWorkout(submission);
    this.setState({
      name: "",
      exercise: [{ name: "", sets: "", reps: "", weights: "" }]
    });*/
  };
  handleChange = input => e => {
    if (["sets", "reps", "weights", "name"].includes(e.target.name)) {
      const exercise = this.state.workout[this.state.step - 2].exercise;

      exercise[e.target.dataset.id][e.target.name] = e.target.value;
      this.setState({
        workout: update(this.state.workout, {
          [this.state.step - 2]: {
            exercise: {
              $set: exercise
              /*
              [e.target.dataset.id]: {
                $set: [
                  {
                    [e.target.className]: e.target.value
                  }
                ]
              }*/
            }
          }
        })
      });
    } else if (e.target.name == "workoutname") {
      let name = this.state.workout[this.state.step - 2].name;
      console.log(name);
      name = e.target.value;
      console.log("workoutname");
      this.setState({
        workout: update(this.state.workout, {
          [this.state.step - 2]: {
            name: { $set: name }
          }
        })
      });
    } else {
      this.setState({ [input]: e.target.value });
    }
  };

  render() {
    const { step } = this.state;
    const { name, length, workout } = this.state;
    const values = { step, name, length, workout };
    if (step == 1) {
      return (
        <Provider store={store}>
          <React.Fragment>
            <header>
              <ReactTooltip />
              <Header />
              <div className="header-container">
                <div className="routine-form rounded">
                  <div className="form-title">Add a routine</div>
                  <form id="routine">
                    <div className="form-group" title="test">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        onChange={this.handleChange("name")}
                        defaultValue={values.name}
                      />
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="length" className="form-label">
                            Length
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id="length"
                            onChange={this.handleChange("length")}
                            defaultValue={values.length}
                            data-place="bottom"
                            data-tip="# of days in the routine"
                            data-event="focus"
                          />
                        </div>
                      </div>
                      <div className="col">
                        <button className="btn-large" onClick={this.continue}>
                          Continue
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </header>
            <Footer />
          </React.Fragment>
        </Provider>
      );
    } else if (step - 2 < length) {
      return (
        <Provider store={store}>
          <WorkoutForm
            continue={this.continue}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            addExercise={this.addExercise}
            addWorkout={this.addWorkout}
            values={values}
          />
        </Provider>
      );
    } else {
      return (
        <Provider store={store}>
          <Confirm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleSubmit={this.handleSubmit}
            values={values}
          />
        </Provider>
      );
    }
  }
}

const styles = {
  button: {
    margin: 15
  }
};
export default connect(
  null,
  { addRoutine }
)(RoutineForm);
