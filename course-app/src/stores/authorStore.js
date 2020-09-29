import { EventEmitter } from "events";

import Dispatcher from "../appDispatcher";

// import actionTypes to bundle with the new author
import actionTypes from "../actions/actionTypes";

/** store needs to emit an event each time
 *  a change occurs. Extend EventEmitter class
 *  to get this behaviour.
 *
 *  ! see node.js docs for events emitter methods. */

// declare event constant to avoid hardcoding
const CHANGE_EVENT = "change";

// declare a private array to store author data
let _authors = [];

/** author data is not exported/made public - only
 *  the store is exported. The only way to access
 *  the author data will be via public api which
 *  are the functions we declare in this module.
 *  So we can control how AUTHOR data is managed.
 *
 *  Everytime a authorStore is created, the
 *  CREATE_AUTHOR action will be dispatched. It will
 *  include the new author as part of the payload.
 *
 *  So we want to take a new author that will be
 *  passed with the action and push it into an array
 *  that stores author data. This implementation is
 *  executed inside the code block where we register
 *  the store to the dispatcher.
 */

class AuthorStore extends EventEmitter {
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
    // call on to watch for 'change' event
    this.on(
      CHANGE_EVENT,
      // when change occurs we will call the callback function
      callback
    );
    /** this method will allow react components to subscribe
     *  to the store to get notified when a chance occurs.
     *  whatever callback function gets passed in will be
     *  called anytime things change in the store.
     */
  }

  // remove specified listner from the listener array for the event
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

  // give read access to private variable _authors
  getAuthors() {
    return _authors;
  }

  // find author by id
  getAuthorById(id) {
    // use JS find() method which accepts a boolean function (a 'predicate')
    /** predicate anonymous function:
     *  - look through this list of _authors
     *  - find the author that has id equal to the id passed in
     */

    return _authors.find((author) => author.id === id);
  }

  // redirect if author not found
  authorFound(id) {
    // search for authors that match the id
    if (_authors.filter((author) => author.id === id).length > 0) {
      return true;
    } else {
      return false;
    }
  }
}

// instantiate class
const authorStore = new AuthorStore();

/** dispatcher registration is private to the store
 *  thus defined below the store and not part of the
 *  public api.
 */

/** register method accepts a function that takes in
 *  an action.
 *  this function will be called/notified of every
 *  single action dispatched.
 *  So we will need a function that switches based on
 *  the actionType that's being passed.
 */

// Register/subscribe to the dispatcher
Dispatcher.register((payload) => {
  // based on action dispatched
  switch (payload.actionType) {
    // create a new author and save it in a private store array
    case actionTypes.CREATE_AUTHOR:
      _authors.push(payload.author);
      /** action.author gets a author from the payload
       *  dispatched by api functions in authorActions.js
       *  action.actionType checked for in the switch
       *  declaration gets the actionType from the same
       *  dispatcher payload.
       *  i.e. the action is dispatched in authorActions.js
       *  by Dispatcher.dispatch() and caught here via
       *  Dispatcher.register().
       *
       *  Remember the _author data is private so people
       *  can't mess with it. We need a getAuthors method
       *  to access author data. Let's define it inside
       *  the class (we are outside the class here) below
       *  the emitChange() method.
       *
       */

      // emit this change made to the store
      authorStore.emitChange();
      /** emitting a change, will notify any component
       *  registered with the store. The component will
       *  know to update the UI accordingly.
       *  More specifically, any store that calls
       *  addChangeListener() method will be notified
       *  every emitChange() is called.
       */
      break;

    case actionTypes.GET_AUTHOR:
      _authors = payload.author;
      authorStore.emitChange();
      break;

    case actionTypes.LOAD_AUTHORS:
      // load authors from payload in private store
      _authors = payload.authors;
      // anounce change to store
      authorStore.emitChange();
      // Next, decide when to use this action and update AuthorsPage
      /** When do we want the full authors list to load?
       *  1. When needed (Lazy loading data)?
       *     - requires a check to see if authors have been loaded
       *       on each page that needs author data.
       *
       *  2. When the app loads regardless of page user is on?
       *     - if the app needs the same data on many pages, it
       *       may be better to load the data immediately when the
       *       app loads regardless of page.
       *
       *  (For this app we'll implement lazy loading for learning.)
       */
      break;

    case actionTypes.UPDATE_AUTHOR:
      /**
       *  Map over the _authors array and replace the author we want to update.
       *  (map creates a new array by iterating an existing array.
       *  we specify what value to put in the new array for each
       *  element currently in the array.)
       *  - update private array of authors by mapping over the existing array
       *  - for each author check if author.id is equal to the action.author.id
       *  - if true, replace that author with the action.author
       *  - else leave as is
       */
      _authors = _authors.map((author) =>
        author.id === payload.author.id ? payload.author : author
      );

      authorStore.emitChange();
      break;

    // delete author
    case actionTypes.DELETE_AUTHOR:
      _authors = _authors.filter(
        /** for each author in _authors, check if author.id equals action.id (parse to Int possible string
         *  and set radix to base 10)
         *  if function returns true, filter out the match that was deleted.
         *  this will return a new array of authors with one less author.
         */
        (author) => author.id !== parseInt(payload.id, 10) // for filter we pass it a boolean function (a predicate)
      );
      authorStore.emitChange();
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
export default authorStore;
