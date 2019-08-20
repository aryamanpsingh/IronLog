import axios from "axios";
import { ADD_ROUTINE } from "./types";
import { GET_ROUTINES } from "./types";

// ADD Routine
export const addRoutine = routine => dispatch => {
  // Headers
  axios
    .post("/api/create/routine/", routine)
    .then(res => {
      dispatch({
        type: ADD_ROUTINE,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// List Routine
export const getRoutine = () => dispatch => {
  // Headers
  axios
    .get("/api/routine")
    .then(res => {
      dispatch({
        type: GET_ROUTINES,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
