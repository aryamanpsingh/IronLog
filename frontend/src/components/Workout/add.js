//  /src/components/add.js
import { addWorkout } from "../../actions/workout";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import Header from "../layout/header";
import { Link } from "react-router-dom";

class Add extends Component {
  state = {
    name: "",
    exercise: [{ name: "", sets: "", reps: "", weights: "" }]
  };

  static propTypes = {
    addWorkout: PropTypes.func.isRequired
  };

  addExercise = e => {
    e.preventDefault();
    this.setState(prevState => ({
      exercise: [
        ...prevState.exercise,
        { name: "", sets: "", reps: "", weights: "" }
      ]
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    let { name, exercise } = this.state;
    let reps = [];
    let weights = [];
    let array_exercise = [{ name: "", sets: "", reps: [], weights: [] }];
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
    const submission = { name, exercise };
    console.log(submission);
    this.props.addWorkout(submission);
    this.setState({
      name: "",
      exercise: [{ name: "", sets: "", reps: "", weights: "" }]
    });
  };

  handleChange = e => {
    if (["sets", "reps", "weights", "name"].includes(e.target.className)) {
      let exercise = [...this.state.exercise];
      exercise[e.target.dataset.id][e.target.className] = e.target.value;
      this.setState({ exercise }, () => console.log(this.state.exercise));
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  render() {
    let { name, exercise } = this.state;

    return (
      <Fragment>
        <Header />
        <div className="col-md-6 m-auto">
          <div className="card card-body mt-4 mb-4">
            <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
              <div className="form-group">
                <label htmlFor="workout">Workout Name</label>
                <input
                  type="text"
                  name="name"
                  id="workout"
                  onChange={this.handleChange}
                  value={name}
                  className="form-control"
                />
              </div>
              <button onClick={this.addExercise} className="btn btn-primary">
                +
              </button>
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
                        name={exerciseId}
                        data-id={idx}
                        id={exerciseId}
                        className="name"
                        value={exercise[idx].name}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor={setsId}>Sets</label>
                      <input
                        type="text"
                        name={setsId}
                        data-id={idx}
                        id={setsId}
                        className="sets"
                        value={exercise[idx].sets}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor={setsId}>Reps</label>
                      <input
                        type="text"
                        name={repsId}
                        data-id={idx}
                        id={repsId}
                        className="reps"
                        value={exercise[idx].reps}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor={weightsId}>Weights</label>
                      <input
                        type="text"
                        name={weightsId}
                        data-id={idx}
                        id={weightsId}
                        className="weights"
                        value={exercise[idx].weights}
                      />
                    </div>
                  </div>
                );
              })}
              <button type="submit" className="btn btn-warning">
                Submit
              </button>
              <Link to="/list">
                <button className="btn btn-primary">View Workouts</button>
              </Link>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default connect(
  null,
  { addWorkout }
)(Add);
