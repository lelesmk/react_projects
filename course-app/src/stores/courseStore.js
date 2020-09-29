import { EventEmitter } from "events";

import Dispatcher from "../appDispatcher";

// import actionTypes to bundle with the new course
import actionTypes from "../actions/actionTypes";

/** store needs to emit an event each time
 *  a change occurs. Extend EventEmitter class
 *  to get this behaviour.
 *
 *  ! see node.js docs for events emitter methods. */

// declare event constant to avoid hardcoding
const CHANGE_EVENT = "change";

// declare a private array to store course data
let _courses = [];
/** course data is not exported/made public - only
 *  the store is exported. The only way to access
 *  the course data will be via public api which
 *  are the functions we declare in this module.
 *  So we can control how course data is managed.
 *
 *  Everytime a courseStore is created, the
 *  CREATE_COURSE action will be dispatched. It will
 *  include the new course as part of the payload.
 *
 *  So we want to take a new course that will be
 *  passed with the action and push it into an array
 *  that stores course data. This implementation is
 *  executed inside the code block where we register
 *  the store to the dispatcher.
 */

class CourseStore extends EventEmitter {
  /**
   *  the below methods provides a way for the UI/React
   *  components to interact with the store.
   *  every Flux store must have these 3 functions:
   *  1. addChangeListener (wraps EventEmitter's 'on' method)
   *  2. removeChangeListener (wraps EventEmitter's 'removeListener' method)
   *  3. emitChange (wraps EventEmitter's 'emit' method)
   */
  // add listener function to listeners array for the event
  addChangeListener(callback) {
    // on() adds a listener to an array of listeners and returns EventEmitter
    this.on(
      // name of event
      CHANGE_EVENT,
      // when change completes we will call the callback function
      callback
    );
    /** this method will allow react components to subscribe
     *  to the store to get notified when a chance occurs.
     *  whatever callback function gets passed in will be
     *  called anytime things change in the store.
     */
  }

  // removes specified listner from the listener array for the event
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
    /** this method will allow react components to unsubscribe
     *  from the store.
     */
  }
  // synchronously calls each listener registered for the event, in order of register
  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  // give read access to private variable _courses
  getCourses() {
    return _courses;
  }

  // find course by slug
  getCourseBySlug(slug) {
    // use JS find() method which accepts a boolean function (a 'predicate')
    /** predicate anonymous function:
     *  - look through this list of _courses
     *  - find the course that has slug equal to the slug passed in
     */

    return _courses.find((course) => course.slug === slug);
  }

  // redirect if course not found
  courseFound(slug) {
    // search for courses that match the slug
    if (_courses.filter((course) => course.slug === slug).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  // TODO: Add other handy functions that searches course data
}

// instantiate class
const courseStore = new CourseStore();

/** dispatcher registration is private to the store
 *  thus defined below the store and not part of the
 *  public api.
 */

/** register method accepts a function that takes in
 *  a payload.
 *  this function will be called/notified of every
 *  single action dispatched.
 *  So we will need a function that switches based on
 *  the actionType that's being passed.
 */

// Register/subscribe to the dispatcher
Dispatcher.register((payload) => {
  // based on payload dispatched
  switch (payload.actionType) {
    // create a new course and save it in a private store array
    case actionTypes.CREATE_COURSE:
      _courses.push(payload.course);
      /** payload.course gets a course from the payload
       *  dispatched by api functions in courseActions.js
       *  payload.actionType checked for in the switch
       *  declaration gets the actionType from the same
       *  dispatcher payload.
       *  i.e. the payload is dispatched in courseActions.js
       *  by Dispatcher.dispatch() and caught here via
       *  Dispatcher.register().
       *
       *  Remember the _course data is private so people
       *  can't mess with it. We need a getCourses method
       *  to access course data. Let's define it inside
       *  the class (we are outside the class here) below
       *  the emitChange() method.
       *
       */

      // emit calls each registered listener
      courseStore.emitChange();
      /** emitting a change, will notify any component
       *  registered with the store. The component will
       *  know to update the UI accordingly.
       *  More specifically, any store that calls
       *  addChangeListener() method will be notified
       *  every emitChange() is called.
       */
      break;

    case actionTypes.LOAD_COURSES:
      // load courses from payload in private store
      _courses = payload.courses;
      // anounce change to store
      courseStore.emitChange();
      // Next, decide when to use this action and update CoursesPage
      /** When do we want the full courses list to load?
       *  1. When needed (Lazy loading data)?
       *     - requires a check to see if courses have been loaded
       *       on each page that needs course data.
       *
       *  2. When the app loads regardless of page user is on?
       *     - if the app needs the same data on many pages, it
       *       may be better to load the data immediately when the
       *       app loads regardless of page.
       *
       *  (For this app we'll implement lazy loading for learning.)
       */
      break;

    case actionTypes.UPDATE_COURSE:
      /**
       *  Map over the _courses array and replace the course we want to update.
       *  (map creates a new array by iterating an existing array.
       *  we specify what value to put in the new array for each
       *  element currently in the array.)
       *  - update private array of courses by mapping over the existing array
       *  - for each course check if course.id is equal to the payload.course.id
       *  - if true, replace that course with the payload.course
       *  - else leave as is
       */
      _courses = _courses.map((course) =>
        course.id === payload.course.id ? payload.course : course
      );

      courseStore.emitChange();
      break;

    // delete course
    case actionTypes.DELETE_COURSE:
      _courses = _courses.filter(
        /** for each course in _courses, check if course.id equals payload.id (parse to Int possible string
         *  and set radix to base 10)
         *  if function returns true, filter out the match that was deleted.
         *  this will return a new array of courses with one less course.
         */
        (course) => course.id !== parseInt(payload.id, 10) // for filter we pass it a boolean function (a predicate)
      );
      courseStore.emitChange();
      // Next, implement the UI
      break;

    default:
    // nothing to do
    /** Every store's dispatcher receives every action
     *  dispatched, so if the store isn't interested in
     *  that action, there's nothing to do.
     */
  }
});

// export store
export default courseStore;

/** next, register store with dispatcher so
 *  the store is  notified when an action occurs.*/

//====== BOILERPLATE CODE FOR STORES ====== //
//========= The shell of a store ========= //

/**
 *  1. Create a class that extends the EventEmitter
 *     to emit an event when an action produced
 *  2. Implement 3 EventEmitter functions to interact with UI
 *     (addChangeListener, removeChangeListener, emitChange)
 *  3. Create an instance of the store
 *  4. Register to the dispatcher so the store get's
 *     called/notified based on the actionType being passed.
 *  5. Implement the action (e.g. create courses and store),
 *     emit the changes, and create methods that access the data.
 *     The CourseStore holds the full list of courses now. React
 *     components/UI don't need to call the api directly to get
 *     course data. All they need to do is call store's methods.
 *
 *  NB! Redux a version of Flux avoids some of this
 *      implementation code. But this understanding makes
 *      it easier to learn Redux. Redux builds upon these
 *      principles.
 */
