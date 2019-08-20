import { combineReducers } from "redux";
import workout from "./workout";
import user from "./user";
import errors from "./errors";
import routine from "./routine";
export default combineReducers({
  workout,
  user,
  errors,
  routine
});
