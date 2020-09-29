/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm";

// import toast notifications
import { toast } from "react-toastify";

// import store to access payloads from the api
import courseStore from "../stores/courseStore";

// import actions to interact with the store and not the api directly
import * as courseActions from "../actions/courseActions";

/** Arrow function component with props received */
const ManageCoursePage = (props) => {
  /**
   *  - declare client side validation state
   *  - initialise with empty object */
  const [errors, setErrors] = useState({});

  // Connect page to Flux store
  /** store the list of courses from the Flux store in state,
   *  then connect to the store in on Mount - useEffect()
   */
  const [courses, setCourses] = useState(courseStore.getCourses());

  /**
   *  - declare state to hold course form data
   *  - initialise with an empty course object
   * */
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: "",
  });

  // Edit course
  useEffect(() => {
    // connect/subscribe to the flux store
    courseStore.addChangeListener(onChange); // run onChange() callback when courseStore changes

    // get slug from querry parameters
    const slug = props.match.params.slug; // pulled from path '/courses/:slug' in App.js

    // Find course by slug
    /** if the user access this page directly we need to check
     *  if courses have been loaded into the Flux store.
     *  if courses have not been load we need to ask the Flux
     *  store to load them before the use can access a course.
     */

    // on page load check if there's any courses in state yet
    if (courses.length === 0) {
      // if no courses in courses array we load them
      /** when this change is completed the
       *  callback onChange() is executed and
       *  updated the array of courses.
       *  since courses.length is listed in the
       *  dependency array below, useEffect will run again.*/
      courseActions.loadCourses();
    } else if (slug) {
      // get course from store and update the course
      /** getCourseBySlug returns a course with a specified slug
       *  from the flux store. The result is passed to setCourse().
       */

      if (courseStore.courseFound(slug) === true) {
        setCourse(courseStore.getCourseBySlug(slug)); // from path '/courses/:slug'
      } else {
        props.history.push("/404");
      }
    }

    // on UNMOUNTING (navigating to a different page) return this function
    /** useEffect lets declare the code to run when a component UNMOUNTS
     *  by returning a funciton.
     */
    return () => courseStore.removeChangeListener(onChange); // clean addChangeListener new page is rendered
  }, [props.history, courses.length, props.match.params.slug]); // declare a dependancy array
  /** If anything in the dependency array changes, useEffect will re-run.
   *  When useEffect runs the second time after courses are loaded
   *  courses.length will not be 0 and if there's a slug in the url
   *  it will ask the store for the relevant course, and the course
   *  will be there because the array of courses  has already been
   *  populated in the Flux store.
   */

  // declare change handler to enable form inputs
  function handleChange(event) {
    /**
     *  - use ...spread operator to copy state for editing
     *  - set value passed in by form event based on the
     *    name property of element e.g.
     *    if attribute name="title",
     *    then value will be stored in course.title
     *    and intialised to a variable prop [event.target.name]
     *    called a Computed Property
     *    which can be used by each form input.
     *  - pass updated course to setCourse function*/
    const updatedCourse = {
      // copy the course object
      ...course,
      // set the title property on the copy to the value passed in on the event
      [event.target.name]: event.target.value,
      // [event.target.name]: event.target.value,
    };
    // pass the updatedCourse to the setCourse function
    setCourse(updatedCourse);
  }
  // Rename authors array keys to html options tag attributes
  // function options(options) {
  //   // map object array
  //   return (options = options.map((item) => {
  //     debugger;
  //     // copy object array and rename keys to value and label
  //     return { value: item.id, label: item.name };
  //   }));
  // }

  // execute function when a course is added to the store
  function onChange() {
    // request courses from store and add/set to this component state
    setCourses(courseStore.getCourses());
    /** what this says is:
     *  - getCourses from the api
     *  - when the api call completes, then
     *  - store the array of courses in state */
  }

  // form validation function
  function formIsValid() {
    // declare local errors object
    const _errors = {};

    // initialise errors if course props empty
    if (!course.title) _errors.title = "Title is required";
    if (!course.authorId) _errors.authorId = "Author ID is required";
    if (!course.category) _errors.category = "Category is required";

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

    // call courseActions (instead of directly calling the api)
    courseActions
      // pass the course held in state
      .saveCourse(course)

      /** all the api functions return a promise so we could
       *  declare .then() to specify what should happen after
       *  the saveCourse is completed.
       */
      .then(() => {
        // redirect back to CoursesPage
        props.history.push("/courses");
        /** since Add Course was loaded via
         * React Router's Route we have access to
         * React Router's history object on props.
         * So we can programmatically redirect the
         * user after the save is completed. */

        // display notification after success save
        toast.success("Course saved.");
      });
  }

  return (
    <>
      <h2>Manage Course</h2>
      {/** Pass down to CourseForm child component via props
       *  - pass down course state object
       *  - pass down change handler
       *  - pass down save form handler
       *  - pass down validation errors */}
      <CourseForm
        course={course}
        onChange={handleChange}
        onSubmit={handleSubmit}
        errors={errors}
      />
    </>
  );
};

export default ManageCoursePage;

// then create a route in App.js
