import dispatcher from "../appDispatcher";

// import authorApi to implement action calls to api
import * as authorApi from "../api/authorApi";

import actionTypes from "./actionTypes";

// ! the below function is called an Action Creator ! //
export function saveAuthor(author) {
  // call authorApi to save a author passed in by this function
  /** return the promise from the call to api so
   *  the caller of this function will be notified
   *  when the promise resolves/completes */
  return authorApi.saveAuthor(author).then((savedAuthor) => {
    // returns savedAuthor
    // handle saved author response
    /** use flux dispatcher to notify all the stores
     *  that a author was just created. Stores will
     *  take the data payload dispatched here and
     *  put it to use.
     */
    dispatcher.dispatch(
      // an action is an object with actionType property
      {
        // ! the below properties declared make up the Action ! //

        // required property

        // actionType: "CREATE_AUTHOR",
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
         *  an existing author or new author.
         */
        actionType: author.id // if author has an id
          ? actionTypes.UPDATE_AUTHOR // then UPDATE
          : actionTypes.CREATE_AUTHOR, // else CREATE

        // optional properties to pass with action object
        author: savedAuthor,
      }
    );
  });
}

// declare flux call to api
export function loadAuthors() {
  return authorApi.getAuthors().then((authors) => {
    // returns authors array
    // dispatch authors array payload with action
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_AUTHORS,
      authors: authors,
    });
  });

  // Next, update the authorStore to handle this actionType
}

// get author by id
export function getAuthorById(id) {
  return authorApi.getAuthorById(id).then((author) => {
    // empty return ()
    // dispatch authors array payload with action
    dispatcher.dispatch({
      actionType: actionTypes.GET_AUTHOR,
      author: author,
    });
  });
}

// delete author by id
export function deleteAuthor(id) {
  return authorApi.deleteAuthor(id).then(() => {
    // empty return ()
    // dispatch courses array payload with action
    dispatcher.dispatch({
      actionType: actionTypes.DELETE_AUTHOR,
      id: id,
    });
  });
}
