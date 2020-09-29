/** INITIAL REDUX SETUP                       ||  ADDING A FEATURE    **/
/*********************************************||************************
 *  1.  Create action                         ||  1.  Create action
 *      - function creating an object         ||  2.  Enhance reducer
 *        describing the event type           ||  3.  Connect component
 *        and event data                      ||  4.  Dispatch action
 *  2.  Create reducer                        ||
 *      - function for handling actions       ||
 *        that accepts state and action       ||
 *        and returns a new state copy        ||
 *  3.  Create root reducer                   ||
 *      - combines multiple reducers in       ||
 *        one location                        ||
 *  4.  Configure store                       ||
 *      - create store passing combined       ||
 *        reducers and initial data           ||
 *      - enable Redux dev tools and apply    ||
 *        middleware to warn against          ||
 *        mutating the store                  ||
 *  5.  Instantiate store                     ||
 *      -  At the root of our App pass an     ||
 *         instance of our store to child     ||
 *         components                         ||
 *  6.  Connect component                     ||
 *      - declare which data from state and   ||
 *        which action to expose to component ||                        ||
 *  7.  Pass props via connect
 *      - pass state and action to connect    ||
 *        which connects the component to     ||
 *        Redux store.                        ||
 *  8.  Dispatch action                       ||
 *      - dispatch action on user event from  ||
 *        component                           ||
 *
 ********************************************************************/

import * as types from "./actionTypes";

// Create action createCourse that accepts course data
export function createCourse(course) {
  // ---------------------------------------------------------------------------------------------------------------------- //
  // Redux Flow - Step 1: -> React dispatch action (CoursePage) -> function saveCourse()
  // Redux Flow - Step 2: -> Redux return action and payload (courseActions) -> function createCourse()
  // Redux Flow - Step 3: -> Redux handle action and payload (courseReducer) -> function courseReducer() - adds new course
  // Redux Flow - Step 4: -> React map changes to props (CoursePage) - function mapStateToProps()
  // ---------------------------------------------------------------------------------------------------------------------- //

  // action create returns an object with a type property [and payload course passed in]
  return { type: types.CREATE_COURSE, course: course };
}
