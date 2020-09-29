import { combineReducers } from "redux";
import courses from "./courseReducer";

const rootReducer = combineReducers({
  // declare courseReducer which returns updated courses
  courses: courses,
});

export default rootReducer;
