import React, {Component, PropTypes} from "react";

class CourseSearch extends Component {
  render() {
    const {
      onSubmit
    } = this.props;

    const formOnSubmit = (event) => {
      event.preventDefault();

      const fields = ["courseName"];

      let formValues = {};

      fields.
        map(field => event.target.elements.namedItem(field)).
        map(input => formValues[input.name] = input.value);

      return onSubmit(formValues);
    };

    return (
      <div>
        <form onSubmit={formOnSubmit}>
          <input
            name="courseName"
            type="search"
          />
        </form>
      </div>
    );
  }
}
CourseSearch.displayName = "CourseSearch";

CourseSearch.propTypes = {
  onSubmit: PropTypes.func
};

export default CourseSearch;
