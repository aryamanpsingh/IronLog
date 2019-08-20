import axios from "axios";
import { ADD_WORKOUT } from "./types";
import { GET_WORKOUTS } from "./types";

// ADD Workout
export const addWorkout = workout => dispatch => {
  // Headers
  axios
    .post("/api/create/workout/", workout)
    .then(res => {
      dispatch({
        type: ADD_WORKOUT,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// List Workout
export const getWorkout = () => dispatch => {
  // Headers
  axios
    .get("/api/list")
    .then(res => {
      dispatch({
        type: GET_WORKOUTS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
