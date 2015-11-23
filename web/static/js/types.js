import {PropTypes} from "react";

export const COURSE = {
  description: PropTypes.string,
  id: PropTypes.number,
  number: PropTypes.string,
  subject: PropTypes.string,
  title: PropTypes.string
};

export const SECTION = {
  registration_code: PropTypes.string,
  schedule_type: PropTypes.string,
  time_start: PropTypes.string,
  time_end: PropTypes.string,
  days: PropTypes.arrayOf(PropTypes.string),
  location: PropTypes.string,
  date_start: PropTypes.string,
  date_end: PropTypes.string,
  registration_start: PropTypes.string,
  registration_end: PropTypes.string,
  campus: PropTypes.string,
  credits: PropTypes.string,
  instructional_method: PropTypes.string,
  course: COURSE
  // term: TERM
};
