import React, { useState, useEffect } from "react";

// import function to call from mock api
import authorStore from "../stores/authorStore";

import { loadAuthors, deleteAuthor } from "../actions/authorActions";

// import logic into our page markup
import { Link } from "react-router-dom";

import AuthorsList from "../components/AuthorsList";

// FUNCTION COMPONENT WITH HOOKS
/**======================================= */

function AuthorsPage() {
  // declare state with useState hook
  /** - useState hook returns an array with two values
   *   [ nameOfSate, nameOfSetterMethod ]
   *  - initialise state with the authors held in authorStore
   */
  const [authors, setAuthors] = useState(authorStore.getAuthors());

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
      <h2>Authors</h2>
      {/** - add course button to ManageCoursePage component */}
      <Link to="/author" className="btn btn-primary">
        Add Author
      </Link>
      {/** - call child component
       *   - use props to pass courses array
       *     from parent to child
       *  (props are like html attributes for react components)
       */}
      <AuthorsList
        authors={authors}
        deleteAuthor={deleteAuthor}
        getAuthorName={getAuthorName}
      />
    </>
  );

  // execute function when a course is added to the store
  function onAuthorChange() {
    // request authors from store and add/set to this component state
    setAuthors(authorStore.getAuthors());
  }
}

export default AuthorsPage;
