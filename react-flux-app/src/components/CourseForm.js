import React from "react";

// consume reusable TextInput component
import TextInput from "../common/TextInput";

// import PropTypes
import PropTypes from "prop-types";
import SelectDropDown from "../common/SelectDropDown";

function CourseForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      {/** insert onSubmit on form tag rather than the
       *   submit button for better accessibility. User
       *   can click Save button or hit Enter to submit. */}
      <TextInput
        id="title"
        label="Title"
        onChange={props.onChange}
        name="title"
        value={props.course.title}
      />

      <SelectDropDown
        id="author"
        label="Author"
        name="authorId"
        onChange={props.onChange}
        value={props.course.authorId || ""}
      />
      {/* <Select
            id="author"
            name="authorId"
            options={props.options(props.authors)}
            value={props.selectedOption || ""}
            className="mb-3"
            onChange={props.onAuthorChange}
            placeholder="Select author"
            isSearchable
          ></Select> */}

      <TextInput
        id="category"
        label="Category"
        name="category"
        onChange={props.onChange}
        value={props.course.category}
      />

      <input type="submit" value="Save" className="btn btn-primary" />
    </form>
  );
}

// declare PropTypes
CourseForm.propTypes = {
  course: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default CourseForm;
