import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getWorkout } from "../../actions/workout";
export class List extends Component {
  state = {
    isSelected: false,
    name: "",
    exercise: [{ name: "", sets: "", reps: "", weights: "" }],
    date_created: ""
  };
  static propTypes = {
    workout: PropTypes.array.isRequired
  };
  componentDidMount() {
    this.props.getWorkout();
    console.log(this.state);
  }

  loadWorkout = name => {
    if (name) {
      var result = this.props.workout.filter(function(workout) {
        return workout.name == name;
      });
      console.log(result[0]);
      let exercises = [{ name: "", sets: "", reps: [], weights: [] }];

      this.setState({
        isSelected: true,
        name: result[0].name,
        exercise: result[0].exercise,
        date_created: result[0].created_at
      });
    }
  };

  showWorkout = () => {
    if (this.state.name == "") return <div />;
    console.log(this.state.name);
    return (
      <div className="exercise-list">
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
            {this.state.exercise.map((exercise, idx) => {
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
        <button className="btn btn-dark" onClick={this.deselectWorkout}>
          <h4>Done</h4>
        </button>
      </div>
    );
  };

  showList = () => {
    return (
      <div className="workout-list">
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
            {this.props.workout.map((workout, idx) => (
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
        </table>
      </div>
    );
  };

  deselectWorkout = () => {
    this.setState({
      isSelected: false,
      name: "",
      exercise: [{ name: "", sets: "", reps: "", weights: "" }]
    });
  };

  render() {
    return (
      <Fragment>
        <div className="container">
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
            {this.props.workout.map((workout, idx) => (
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
          <this.showWorkout />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  exercise: [{ name: "", sets: "", reps: "", weights: "" }],
  workout: state.workout.workout
});
export default connect(
  mapStateToProps,
  { getWorkout }
)(List);
