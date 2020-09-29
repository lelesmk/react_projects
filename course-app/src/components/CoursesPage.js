import React, { useState, useEffect } from "react";

// import function to call from mock api
import courseStore from "../stores/courseStore";
import authorStore from "../stores/authorStore";

import { loadCourses, deleteCourse } from "../actions/courseActions";

// import logic into our page markup
import CourseList from "../components/CourseList";
import { Link } from "react-router-dom";
import { loadAuthors } from "../actions/authorActions";

// FUNCTION COMPONENT WITH HOOKS
/**======================================= */

function CoursesPage() {
  // declare state with useState hook
  /** - useState hook returns an array with two values
   *   [ nameOfSate, nameOfSetterMethod ]
   *  - initialise state with the courses held in CourseStore
   */
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [authors, setAuthors] = useState(authorStore.getAuthors());

  // call useEffect to make call to store to get courses
  useEffect(() => {
    //===== useEffect body is code to run when the component mounts =====//

    // on MOUNTING: subsctibe to Flux store to listen for changes
    /** addChangeListener accepts a function to call
     *  when the store changes.
     *  Remember to clean component when adding a change listener
     *  on MOUNT by calling removeChangeListener when component
     *  UNMOUNTS.
     */
    courseStore.addChangeListener(onCourseChange);

    // load courses if this request is made for the first time
    /**
     *  - check if courseStore has any courses loaded from api
     *  - if no courses, then call loadCourses from imported courseActions
     */
    if (courseStore.getCourses().length === 0) {
      loadCourses();
    }

    //===== useEffect return is code to run on umount =====//

    // on UNMOUNTING (navigating to a different page) return this function
    /** useEffect lets declare the code to run when a component UNMOUNTS
     *  by returning a funciton.
     */
    return () => courseStore.removeChangeListener(onCourseChange); // clean up on unmount (navigate to a different page)

    //===== useEffect [] dependency array is code to run everytime a re-render occurs =====//
    /** when dependency array is empty, we're specifying the body to run once */
  }, []);

  useEffect(() => {
    authorStore.addChangeListener(onAuthorChange);

    // load authors state with array of authors
    if (authorStore.getAuthors().length === 0) {
      loadAuthors();
    }

    return () => authorStore.removeChangeListener(onAuthorChange);
  }, []);

  function getAuthorName(courseAuthorId, authorsArray) {
    console.log("searchAuthor() runs...");
    for (let i = 0; i < authorsArray.length; i++) {
      console.log("authorsArray[i].name: " + authorsArray[courseAuthorId].name);
      return authorsArray[courseAuthorId].name;
    }
  }

  return (
    <>
      <h2>Courses</h2>
      {/** - add course button to ManageCoursePage component */}
      <Link to="/course" className="btn btn-primary">
        Add Course
      </Link>
      {/** - call child component
       *   - use props to pass courses array
       *     from parent to child
       *  (props are like html attributes for react components)
       */}
      <CourseList
        courses={courses}
        deleteCourse={deleteCourse}
        authors={authors}
        getAuthorName={getAuthorName}
      />
    </>
  );

  // execute function when a course is added to the store
  function onCourseChange() {
    // request courses from store and add/set to this component state
    setCourses(courseStore.getCourses());

    /** what this says is:
     *  - getCourses from the api
     *  - when the api call completes, then
     *  - store the array of courses in state */
  }

  function onAuthorChange() {
    setAuthors(authorStore.getAuthors());
  }
  // SUMMARY OF STATE OF CONCERNS
  /**
   *  This separates Smart component (CoursesPage) from
   *  the Dumb component (CourseList).
   *  Our controller view / smart component
   *    1. Requests courses from the store
   *    2. Sets the state 'courses'
   *    3. Passes that state (course array) to child
   *       CourseList for rendering
   *  The CourseList does nothing but define the markup
   *  and receives an array of courses via props.
   *
   */
}

// CLASS COMPONENT WITH LIFECYCLE METHODS
/**======================================= */
// class CoursesPage extends React.Component {
//   // store list of courses in state
//   // store state by constructor
//   //   constructor(props) {
//   //     super(props);

//   //     // declare state as an object
//   //     this.state = {
//   //       courses: [],
//   //     };
//   //   }

//   // OR simply declare state without constructor
//   state = {
//     courses: [],
//   };

//   // call lifecycle method for making API calls
//   componentDidMount() {
//     // the component must be mounted before calling setSate()

//     // /**
//     //  *  - returns a promise based api - a future value
//     //  *  - .then() handles the future response value */
//     // getCourses().then(
//     //   //   /**
//     //   //    *  - function call will be resolved when the
//     //   //    *    api call is completed.
//     //   //    *  - the anonymous function(courses) receives an
//     //   //    *    array of courses returned by getCourses() api call */
//     //   function (courses) {
//     //     //     /**
//     //     //      *  - now we have a reference to the list of courses
//     //     //      *    and ready to set state.
//     //     //      *  - setSate accepts an object that describes the new
//     //     //      *    new properties that we'd like to set in state.
//     //     //      *  - set courses object with the courses list properties
//     //     //      *    we've just received.*/
//     //     this.setState({ courses: courses });
//     //   }
//     // );
//     // more concise Arrow Function syntax
//     getCourses().then((courses) => this.setState({ courses: courses }));
//     /** what this says is:
//      *  - getCourses from the api
//      *  - when the api call completes, then
//      *  - store the array of courses in state */
//   }

//   // display state in table
//   render() {
//     return (
//       <>
//         <h2>Courses</h2>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Title</th>
//               <th>Author ID</th>
//               <th>Category</th>
//             </tr>
//           </thead>
//           <tbody>
//             {/** - iterate this state.courses and
//              *   - call map on that array of courses.
//              *   - map returns an array. */}
//             {this.state.courses.map((course) => {
//               return (
//                 /** - for each course return a table row array.
//                  *  - assign a unique key to child in array so
//                  *  React can track each element when we create
//                  *  multiple instances of an element in the array
//                  *  using React components. Now when we add or remove
//                  *  different elements (row is an element) React
//                  *  can maintain proper state so the order of
//                  *  these element doesn't get destroyed when we
//                  *  re-render the application.
//                  */
//                 <tr key={course.id}>
//                   <td>{course.title}</td>
//                   <td>{course.authorId}</td>
//                   <td>{course.category}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </>
//     );
//   }
// }

export default CoursesPage;
