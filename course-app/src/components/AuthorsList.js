import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function AuthorsList(props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Author</th>
          <th>Admin Panel</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {/** - iterate this courses passed in via props and
         *   - call map on that array of courses.
         *   - map returns an array. */}
        {props.authors.map((author) => {
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
            <tr key={author.id}>
              <td>
                <Link to={"/author/" + author.id}>
                  {props.getAuthorName(author.id - 1, props.authors)}
                </Link>
              </td>
              <td>
                <Link
                  to={"/author/" + author.id}
                  className="btn btn-outline-warning"
                >
                  Edit
                </Link>
              </td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => props.deleteAuthor(author.id)}
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

export default AuthorsList;

AuthorsList.propTypes = {
  // delete course
  deleteAuthor: PropTypes.func.isRequired,
  // courses
  author: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};
