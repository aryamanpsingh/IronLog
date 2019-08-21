import axios from "axios";
import { ADD_ROUTINE } from "./types";
import { GET_ROUTINES } from "./types";
import { tokenConfig } from "./users";
import { createMessage, returnErrors } from "./messages";

// ADD Routine
export const addRoutine = routine => (dispatch, getState) => {
  // Headers
  axios
    .post("/api/create/routine/", routine, tokenConfig(getState))

    .then(res => {
      dispatch(createMessage({ addRoutine: "Routine Added" }));
      dispatch({
        type: ADD_ROUTINE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// List Routine
export const getRoutine = () => (dispatch, getState) => {
  // Headers
  axios
    .get("/api/routine", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_ROUTINES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
