import React, {PropTypes} from "react";
import "css/components/CourseSearch";

const submitForm = (onSubmit) => (event) => {
  event.preventDefault();

  const fields = ["courseName"];

  let formValues = {};

  fields.
    map(field => event.target.elements.namedItem(field)).
    map(input => formValues[input.name] = input.value);

  return onSubmit(formValues);
};

const CourseSearch = ({onSubmit, text}) => (
  <div className="CourseSearch">
    <form
      className="input"
      onSubmit={submitForm(onSubmit)}
      role="search"
      >
      <i className="icon-search"></i>
      <input
        name="courseName"
        type="search"
        defaultValue={text}
        placeholder="Search"
      />
    </form>
  </div>
);

CourseSearch.displayName = "CourseSearch";

CourseSearch.propTypes = {
  text: PropTypes.string,
  onSubmit: PropTypes.func
};

export default CourseSearch;
