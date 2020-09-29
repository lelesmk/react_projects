/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from "react";
import AuthorForm from "./AuthorForm";

// import toast notifications
import { toast } from "react-toastify";

// import store to access payloads from the api
import authorStore from "../stores/authorStore";

// import actions to interact with the store and not the api directly
import * as authorActions from "../actions/authorActions";

/** Arrow function component with props received */
const ManageAuthorPage = (props) => {
  /**
   *  - declare client side validation state
   *  - initialise with empty object */
  const [errors, setErrors] = useState({});

  // Connect page to Flux store
  /** store the list of authors from the Flux store in state,
   *  then connect to the store in on Mount - useEffect()
   */
  const [authors, setAuthors] = useState(authorStore.getAuthors());

  /**
   *  - declare state to hold author form data
   *  - initialise with an empty author object
   * */
  const [author, setAuthor] = useState({
    id: null,
    name: "",
  });
  // Edit author
  useEffect(() => {
    // connect/subscribe to the flux store
    authorStore.addChangeListener(onChange); // run onChange() callback when authorStore changes

    // get id from querry parameters
    const id = props.match.params.id; // pulled from path '/authors/:id' in App.js

    // Find author by id
    /** if the user access this page directly we need to check
     *  if authors have been loaded into the Flux store.
     *  if authors have not been load we need to ask the Flux
     *  store to load them before the use can access a author.
     */

    // on page load check if there's any authors in state yet
    if (authors.length === 0) {
      // if no authors in authors array we load them
      /** when this change is completed the
       *  callback onChange() is executed and
       *  updated the array of authors.
       *  since authors.length is listed in the
       *  dependency array below, useEffect will run again.*/
      authorActions.loadAuthors();
    } else if (id) {
      // get author from store and update the author
      /** getAuthorById returns a author with a specified id
       *  from the flux store. The result is passed to setAuthor().
       */

      if (authorStore.authorFound(id) === true) {
        setAuthor(authorStore.getAuthorById(id)); // from path '/authors/:id'
      } else {
        props.history.push("/404");
      }
    }

    // on UNMOUNTING (navigating to a different page) return this function
    /** useEffect lets declare the code to run when a component UNMOUNTS
     *  by returning a funciton.
     */
    return () => authorStore.removeChangeListener(onChange); // clean addChangeListener new page is rendered
  }, [props.history, authors.length, props.match.params.id]); // declare a dependancy array
  /** If anything in the dependency array changes, useEffect will re-run.
   *  When useEffect runs the second time after authors are loaded
   *  authors.length will not be 0 and if there's a id in the url
   *  it will ask the store for the relevant author, and the author
   *  will be there because the array of authors  has already been
   *  populated in the Flux store.
   */

  // execute function when a author is added to the store
  function onChange() {
    // request authors from store and add/set to this component state
    setAuthors(authorStore.getAuthors());
    /** what this says is:
     *  - getAuthors from the api
     *  - when the api call completes, then
     *  - store the array of authors in state */
  }

  // declare change handler for form inputs
  function handleChange(event) {
    /**
     *  - use ...spread operator to copy state for editing
     *  - set value passed in by form event based on the
     *    name property of element e.g.
     *    if attribute name="title",
     *    then value will be stored in author.title
     *    and intialised to a variable prop [event.target.name]
     *    called a Computed Property
     *    which can be used by each form input.
     *  - pass updated author to setauthor function*/
    const updatedAuthor = {
      ...author,
      [event.target.name]: event.target.value,
    };
    setAuthor(updatedAuthor);
  }

  // form validation function
  function formIsValid() {
    // declare local errors object
    const _errors = {};

    // initialise errors if author props empty
    if (!author.name) _errors.name = "Name is required";

    // pass validation error result
    setErrors(_errors);

    // form is valid if the errors object has no properties
    return Object.keys(_errors).length === 0; // returns boolean
    /**
     *  the Object.keys returns an array of an object's keys.
     *  if the array of keys for the _errors' object is 0 then
     *  the errors object has no properties.
     */
  }

  // declare submit handler
  // automatically receives an event from browser
  function handleSubmit(event) {
    // handle form validation
    /** if the form is not valid then do nothing. */
    if (!formIsValid()) return;

    // to handle event on client, call prevent default post to server
    event.preventDefault();

    // call authorActions (instead of directly calling the api)
    authorActions
      // pass the author held in state
      .saveAuthor(author)
      /** all the api functions return a promise so we could
       *  declare .then() to specify what should happen after
       *  the saveAuthor is completed.
       */
      .then(() => {
        // redirect back to AuthorsPage
        props.history.push("/authors");
        /** since Add Author was loaded via
         * React Router's Route we have access to
         * React Router's history object on props.
         * So we can programmatically redirect the
         * user after the save is completed. */

        // display notification after success save
        toast.success("Author saved.");
      });
  }

  return (
    <>
      <h2>Manage Author</h2>
      {/** Pass down to AuthorForm child component via props
       *  - pass down author state object
       *  - pass down change handler
       *  - pass down save form handler
       *  - pass down validation errors */}
      <AuthorForm
        author={author}
        onChange={handleChange}
        onSubmit={handleSubmit}
        errors={errors}
      />
    </>
  );
};

export default ManageAuthorPage;

// then create a route in App.js
