/**
 *  acitonTypes are used by the system and strongly typed
 *  to support autocomplete and prevent typing errors
 *  when declared in stores.
 *
 *  also serves as a quick reference to see all actions
 *  supported by the application.
 */
export default {
  // declare action, then implement api call in courseActions.js
  CREATE_COURSE: "CREATE_COURSE",
  UPDATE_COURSE: "UPDATE_COURSE",
  DELETE_COURSE: "DELETE_COURSE",
  LOAD_COURSES: "LOAD_COURSES",

  // authors actions
  CREATE_AUTHOR: "CREATE_AUTHOR",
  UPDATE_AUTHOR: "UPDATE_AUTHOR",
  DELETE_AUTHOR: "DELETE_AUTHOR",
  GET_AUTHOR: "GET_AUTHOR",
  LOAD_AUTHORS: "LOAD_AUTHORS",
};

// Creating new actions:
/**
 *  1. Declare actionTypes
 *  2. Implement courseActions (api calls) and dispatch action playload
 *  3. Use/handle actions in courseStore
 *  4. Implement the UI (import action, pass to jsx via props, add button/link)
 */
