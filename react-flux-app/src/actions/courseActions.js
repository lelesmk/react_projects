import dispatcher from "../appDispatcher";

// import courseApi to implement action calls to api
import * as courseApi from "../api/courseApi";

import actionTypes from "./actionTypes";

// ! the below function is called an Action Creator ! //
export function saveCourse(course) {
  // call courseApi to save a course passed in by this function
  /** return the promise from the call to api so
   *  the caller of this function will be notified
   *  when the promise resolves/completes */
  return courseApi.saveCourse(course).then((savedCourse) => {
    // returns savedCourse
    // handle saved course response
    /** use flux dispatcher to notify all the stores
     *  that a course was just created. Stores will
     *  take the data payload dispatched here and
     *  put it to use.
     */
    dispatcher.dispatch(
      // an action is an object with actionType property
      {
        // ! the below properties declared make up the Action ! //

        // required property

        // actionType: "CREATE_COURSE",
        /**
         *  actionType is hardcoded as a magic string.
         *  this requires carefully typing it the
         *  exact same way when declaring the store
         *  which will handle the action.
         *
         *  instead its best practice to create a
         *  constant file that contains a list of
         *  all the actionTypes used in the system
         *  (actionType is a constant so assigned
         *  with uppercase.)
         *
         */

        // call actionTypes object instead of hardcoding

        /** call action based on whether a we're working on
         *  an existing course or new course.
         */
        actionType: course.id // if course has an id
          ? actionTypes.UPDATE_COURSE // then UPDATE
          : actionTypes.CREATE_COURSE, // else CREATE

        // optional properties to pass with action object
        course: savedCourse,
      }
    );
  });
}

// declare flux call to api
export function loadCourses() {
  return courseApi.getCourses().then((courses) => {
    // returns courses array
    // dispatch courses array payload with action
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_COURSES,
      courses: courses,
    });
  });

  // Next, update the courseStore to handle this actionType
}

// delete course by id
export function deleteCourse(id) {
  return courseApi.deleteCourse(id).then(() => {
    // empty return ()
    // dispatch courses array payload with action
    dispatcher.dispatch({
      actionType: actionTypes.DELETE_COURSE,
      id: id,
    });
  });
}
