import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getRoutine } from "../../actions/routine";
import Header from "../layout/header";
import { Link } from "react-router-dom";
export class List extends Component {
  state = {
    name: "",
    length: "",
    workout: [
      { name: "", exercise: [{ name: "", sets: "", reps: [], weights: [] }] }
    ],
    isSelected: false,
    displayWorkout: false,
    date_created: "",
    currentWorkout: {
      name: "",
      exercise: [{ name: "", sets: "", reps: [], weights: [] }]
    }
  };
  static propTypes = {
    routine: PropTypes.array.isRequired
  };
  componentDidMount() {
    this.props.getRoutine();
    console.log(this.state);
  }

  loadRoutine = name => {
    if (name) {
      var result = this.props.routine.filter(function(routine) {
        return routine.name == name;
      });
      console.log(result[0]);

      this.setState({
        isSelected: true,
        name: result[0].name,
        length: result[0].length,
        workout: result[0].workout,
        date_created: result[0].created_at
      });
    }
  };
  loadWorkout = value => {
    this.setState({
      displayWorkout: true,
      currentWorkout: value
    });
  };
  showWorkout = () => {
    if (this.state.displayWorkout) {
      let workout = this.state.currentWorkout;
      return (
        <div className="exercise-list">
          <div className="workout-name">
            <h3>{workout.name}</h3>
          </div>

          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Sets</th>
                <th>Reps</th>
                <th>Weights</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {workout.exercise.map((exercise, idx) => {
                let exerciseId = `exercise-${idx}`,
                  setsId = `sets-${idx}`,
                  repsId = `reps-${idx}`,
                  weightsId = `weights-${idx}`;
                return (
                  <tr key={idx}>
                    <td key={exerciseId}>
                      <h4>{exercise.name}</h4>
                    </td>
                    <td key={setsId}>
                      <h4>{exercise.sets}</h4>
                    </td>
                    <td key={repsId}>
                      <table>
                        <tbody>
                          {exercise.reps.map((reps, idx) => (
                            <tr key={idx}>
                              <td key={idx}>
                                <h4>{reps}</h4>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                    <td key={weightsId}>
                      <table>
                        <tbody>
                          {exercise.weights.map((weight, idx) => (
                            <tr key={idx}>
                              <td key={idx}>
                                <h4>{weight}</h4>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <div />;
    }
  };
  showRoutine = () => {
    if (this.state.name == "") return <div />;
    console.log(this.state.workout);
    return (
      <div className="exercise-list">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Day</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.workout.map((value, idx) => {
              let rowId = `row-${idx}`;
              let workoutId = `workout-${idx}`;
              return (
                <tr key={idx}>
                  <td key={workoutId} onClick={() => this.loadWorkout(value)}>
                    {console.log(value)}
                    <h4>{value.name}</h4>
                  </td>

                  <td key={idx}>
                    <h4>{idx + 1}</h4>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <this.showWorkout />
        <div className="backButton">
          <button className="btn" onClick={this.deselectRoutine}>
            Done
          </button>
        </div>
      </div>
    );
  };

  showList = () => {
    return (
      <div className="workout-list">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Days</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.routine.map((routine, idx) => (
              <tr key={idx}>
                <td
                  key={routine.name}
                  name={routine.name}
                  className="name"
                  value={routine.name}
                  onClick={() => this.loadRoutine(routine.name)}
                >
                  <h4>{routine.name}</h4>
                </td>
                <td
                  key={routine.created_at}
                  name={routine.created_at}
                  className="date-created"
                  value={routine.length}
                >
                  <h4>{routine.length}</h4>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/add">
          <button className="btn btn-primary">Add Routine</button>
        </Link>
      </div>
    );
  };

  deselectRoutine = () => {
    this.setState({
      name: "",
      length: "",
      workout: [
        { name: "", exercise: [{ name: "", sets: "", reps: "", weights: "" }] }
      ],
      isSelected: false,
      date_created: ""
    });
  };

  render() {
    return (
      <Fragment>
        <Header />
        <div className="list-container">
          {this.state.isSelected == false && <this.showList />}
          {/*}
        <h2>Workouts: </h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>ID</th>
              <th>Name</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.routine.map((workout, idx) => (
              <tr key={idx}>
                <td key={workout.name}>
                  <button
                    name={workout.name}
                    className="name"
                    value={workout.name}
                    onClick={() => this.loadWorkout(workout.name)}
                  >
                    <h4>{workout.name}</h4>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
            </table>*/}
          <this.showRoutine />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  workout: [
    { name: "", exercise: [{ name: "", sets: "", reps: "", weights: "" }] }
  ],
  routine: state.routine.routine
});
export default connect(
  mapStateToProps,
  { getRoutine }
)(List);
