import React, { useState, useEffect } from "react";
import { getAuthors } from "../api/authorApi";

function SelectDropDown(props) {
  // 1. Set initial value of state and return current value
  const [options, setOptions] = useState([{ value: "", label: "Loading..." }]);

  // 4. Stop use from interacting with dropdown while loading
  const [loading, setLoading] = useState(true);

  // 6. Control dropdown value selected in state and set initial value
  //   const [value, setValue] = useState("Select author");

  let wrapperClass = "form-group";
  // Dynamically add a Bootstrap class name
  if (props.error.length > 0) {
    wrapperClass += " has-error";
    /** Bootstrapper has-error class will add a
     *  red line around the input when it is in
     *  an error state.
     */
  }

  useEffect(
    () =>
      /** first parameter is a function to execute when
       *  the side effect runs */
      {
        // 5. Set unmounted flag to set state only if use is still on the page
        let unmounted = false;

        // 3. Fetch data from a API if use is still mounted
        if (!unmounted) {
          getAuthors().then((_options) =>
            setOptions(
              _options.map(({ id, name }) => ({ value: id, label: name }))
            )
          );

          // 4. Enable dropdown after loading
          setLoading(false);
        }

        // on unmount -> 5
        return () => {
          unmounted = true;
        };
      },
    /** second parameter determines when the side effect runs.
     *  In our case this is just after the component first
     *  renders because we have specified an empty array */
    []
  );

  // 2. Map current value of state to select dropdown options
  return (
    /** diabable while loading -> 4
     *  bind value in state to value prop on select element -> 6
     *  update this state in a change event listener with onChange prop ->6
     */
    <div className={wrapperClass}>
      <label htmlFor={props.id}>{props.label}</label>
      <div className="field">
        <select
          id={props.id}
          name={props.name}
          className="form-control"
          disabled={loading}
          onChange={props.onChange}
          value={props.value}
        >
          {/** iterate current value and label props in state*/}
          {options.map((item) => (
            /** render the relevant option element */

            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      {/** Display validation error below input */}
      {props.error && <div className="alert alert-danger">{props.error}</div>}
    </div>
  );
}

// declare default PropTypes
SelectDropDown.defaultProps = {
  // if no error passed in, default to empty string
  error: "",
};

export default SelectDropDown;
