import { ADD_ROUTINE, GET_ROUTINES } from "../actions/types";

const initialState = {
  routine: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_ROUTINE:
      return {
        ...state,
        routine: [...state.routine, action.payload]
      };
    case GET_ROUTINES:
      return {
        ...state,
        routine: action.payload
      };
    default:
      return state;
  }
}
