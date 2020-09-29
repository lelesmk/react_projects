import React from "react";

// consume reusable TextInput component
import TextInput from "../common/TextInput";

// import PropTypes
import PropTypes from "prop-types";

function AuthorForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      {/** insert onSubmit on form tag rather than the
       *   submit button for better accessibility. User
       *   can click Save button or hit Enter to submit. */}
      <TextInput
        id={props.id}
        label="Author"
        onChange={props.onChange}
        name="author"
        value={props.author.name}
        error={props.errors.name}
      />

      <input type="submit" value="Save" className="btn btn-primary" />
    </form>
  );
}

// declare PropTypes
AuthorForm.propTypes = {
  name: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default AuthorForm;
