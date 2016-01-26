import React, {PropTypes} from "react";

const submitForm = (onSubmit) => (event) => {
  event.preventDefault();

  const fields = ["courseName"];

  let formValues = {};

  fields.
    map(field => event.target.elements.namedItem(field)).
    map(input => formValues[input.name] = input.value);

  return onSubmit(formValues);
};

const CourseSearch = ({onSubmit, text}) => {
  return (
    <div>
      <form onSubmit={submitForm(onSubmit)}>
        <input
          name="courseName"
          type="search"
          defaultValue={text}
        />
      </form>
    </div>
  );
}

CourseSearch.displayName = "CourseSearch";

CourseSearch.propTypes = {
  text: PropTypes.string,
  onSubmit: PropTypes.func
};

export default CourseSearch;
