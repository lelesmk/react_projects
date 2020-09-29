import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

class CoursesPage extends React.Component {
  state = {
    course: {
      title: "",
    },
  };

  handleChange = (event) => {
    const course = { ...this.state.course, title: event.target.value };
    this.setState({ course });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // ---------------------------------------------------------------------------------------------------------------------- //
    // Redux Flow - Step 1: -> React dispatch action (CoursePage) -> function saveCourse()
    // Redux Flow - Step 2: -> Redux return action and payload (courseActions) -> function createCourse()
    // Redux Flow - Step 3: -> Redux handle action and payload (courseReducer) -> function courseReducer() - adds new course
    // Redux Flow - Step 4: -> React map changes to props (CoursePage) - function mapStateToProps()
    // ---------------------------------------------------------------------------------------------------------------------- //

    // dispatch action and declare in PropTypes
    this.props.actions.createCourse(this.state.course);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h3>Add Course</h3>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.course.title}
        />
        <input type="submit" value="Save" />
        {/* display list of courses requested from Redux store with connect() */}
        {this.props.courses.map((course) => (
          <div key={course.title}>{course.title}</div>
        ))}
      </form>
    );
  }
}

CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
};

// Declare what part of state to expose to component
function mapStateToProps(state) {
  // ---------------------------------------------------------------------------------------------------------------------- //
  // Redux Flow - Step 1: -> React dispatch action (CoursePage) -> function saveCourse()
  // Redux Flow - Step 2: -> Redux return action and payload (courseActions) -> function createCourse()
  // Redux Flow - Step 3: -> Redux handle action and payload (courseReducer) -> function courseReducer() - adds new course
  // Redux Flow - Step 4: -> React map changes to props (CoursePage) - function mapStateToProps()
  // ---------------------------------------------------------------------------------------------------------------------- //
  return {
    // request only the data the component needs
    /** be specific about the data being exposed to
     *  the component. If we expose the entire store
     *  then the component will re-render everytime
     *  data changes in the store, even if it is not
     *  relevant to the component.
     */
    courses: state.courses,
  };
}

// Declare by function what actions are available to component

function mapDispatchToProps(dispatch) {
  // return actions which are made available within component on props
  return {
    // Manually map actions to props
    // map action in a call to dispatch
    // createCourse: (course) => dispatch(courseActions.createCourse(course)),

    // Automatically each call to action with dispatch through binding
    // binds all actions to dispatch to be passed on props
    actions: bindActionCreators(courseActions, dispatch),
  };
}

// // OR Declare by object what actions are available to component
// const mapDispatchToProps = {
//   // connect binds dispatch to the action creators declare below
//   creatCourse: courseActions.createCourse,
// };

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);

// Connect component to Redux store
/**
 *  1. Import connect function from react-redux
 *  2. Call connect, passing mapToProps and mapDispatchToProps,
 *     i.e. const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
 *  3. and take the resulting function of connect call and pass it a call
 *     to CoursePage.
 *     i.e. connectedStateAndProps(CoursePage);
 *     OR abreviated in one line
 *     connect(mapStateToProps, mapDispatchToProps)(CoursePage);
 *
 */
