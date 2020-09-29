/** Reuseable code for form inputs */

import React from "react";

/** define PropTypes whenever a reusable component is created
 *  so other devs understand what data to pass down and to
 *  get warnings if we forget to pass the expected data down.
 */
import PropTypes from "prop-types";

function TextInput(props) {
  /** Bootstrap requires a has-error class on the
   *  form group wrapper if the input has an error.
   *
   *  - start with default value "form-group"
   *  - if props.error is set && the error isn't an
   *    empty string
   *      then concatenate another class to wrapperClass
   */
  let wrapperClass = "form-group";
  // Dynamically add a Bootstrap class name
  if (props.error.length > 0) {
    wrapperClass += " has-error";
    /** Bootstrapper has-error class will add a
     *  red line around the input when it is in
     *  an error state.
     */
  }
  return (
    <div className={wrapperClass}>
      <label htmlFor={props.id}>{props.label}</label>
      <div className="field">
        <input
          id={props.id}
          type="text"
          onChange={props.onChange}
          name={props.name}
          className="form-control"
          value={props.value}
        />
      </div>
      {/** Display validation error below input */}
      {props.error && <div className="alert alert-danger">{props.error}</div>}
    </div>
  );
}

// declare PropTypes
TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
};
// declare default PropTypes
TextInput.defaultProps = {
  // if no error passed in, default to empty string
  error: "",
};

export default TextInput;
