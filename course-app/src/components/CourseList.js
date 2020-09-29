import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function CourseList(props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {/** - iterate this courses passed in via props and
         *   - call map on that array of courses.
         *   - map returns an array. */}
        {props.courses.map((course) => {
          return (
            /** - for each course return a table row array.
             *  - assign a unique key to child in array so
             *  React can track each element when we create
             *  multiple instances of an element in the array
             *  using React components. Now when we add or remove
             *  different elements (row is an element) React
             *  can maintain proper state so the order of
             *  these element doesn't get destroyed when we
             *  re-render the application.
             */
            <tr key={course.id}>
              <td>
                <Link to={"/course/" + course.slug}>{course.title}</Link>
              </td>
              <td>{props.getAuthorName(course.authorId - 1, props.authors)}</td>
              <td>{course.category}</td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => props.deleteCourse(course.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default CourseList;

CourseList.propTypes = {
  // delete course
  deleteCourse: PropTypes.func.isRequired,
  // courses
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      authorId: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
};
