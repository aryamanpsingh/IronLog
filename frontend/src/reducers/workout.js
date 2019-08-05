import { ADD_WORKOUT, GET_WORKOUTS } from "../actions/types";

const initialState = {
  workout: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_WORKOUT:
      return {
        ...state,
        workout: [...state.workout, action.payload]
      };
    case GET_WORKOUTS:
      return {
        ...state,
        workout: action.payload
      };
    default:
      return state;
  }
}
