import * as types from "../actions/actionTypes";

// Create reducer to handle course actions and state
/**
 *  exporting the reducer as "default" allows us
 *  to reference the imported reducer with any name.
 *  In the root reducer index (where all reducers are
 *  combined) we appropriately reference courseReducer
 *  as "courses".
 */
export default function courseReducer(state = [], action) {
  // state initialised to empty array of courses
  switch (action.type) {
    // if action passed in is CREATE_COURSE
    case types.CREATE_COURSE:
      // ---------------------------------------------------------------------------------------------------------------------- //
      // Redux Flow - Step 1: -> React dispatch action (CoursePage) -> function saveCourse()
      // Redux Flow - Step 2: -> Redux return action and payload (courseActions) -> function createCourse()
      // Redux Flow - Step 3: -> Redux handle action and payload (courseReducer) -> function courseReducer() - adds new course
      // Redux Flow - Step 4: -> React map changes to props (CoursePage) - function mapStateToProps()
      // ---------------------------------------------------------------------------------------------------------------------- //

      // return a new updated copy of courses in state
      return [
        // copy existing array of courses in state
        ...state,
        // add the course that was passed in
        { ...action.course },
      ];
    // if course reducer receives an action not related to course data
    default:
      // return state untouched
      return state;
  }

  /** For this size app we're storing the list of courses as a simple
   *  array of objects. But for large data sets, we can consider storing
   *  by ID instead declaring an object instead of an array.
   *
   *  See "Normalizing State Shape in the Redux docs."
   */
}
