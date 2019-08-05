import { combineReducers } from "redux";
import workout from "./workout";
import user from "./user";
import errors from "./errors";
export default combineReducers({
  workout,
  user,
  errors
});
