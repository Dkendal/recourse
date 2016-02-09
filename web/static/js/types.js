import {PropTypes} from "react";

export const COURSE = PropTypes.shape({
  description:  PropTypes.string,
  id:           PropTypes.number.isRequired,
  number:       PropTypes.string.isRequired,
  subject:      PropTypes.string.isRequired,
  title:        PropTypes.string.isRequired,
});

export const SECTION = PropTypes.shape({
  campus:                PropTypes.string,
  course:                COURSE.isRequired,
  credits:               PropTypes.number.isRequired,
  instructional_method:  PropTypes.string.isRequired,
  crn:     PropTypes.string.isRequired,
  registration_end:      PropTypes.string.isRequired,
  registration_start:    PropTypes.string.isRequired,
  schedule_type:         PropTypes.string.isRequired,
});

export const MEETING_TIME = PropTypes.shape({
  date_end:     PropTypes.string.isRequired,
  date_start:   PropTypes.string.isRequired,
  days:         PropTypes.arrayOf(PropTypes.string).isRequired,
  instructors:  PropTypes.arrayOf(PropTypes.string).isRequired,
  location:     PropTypes.string.isRequired,
  end_time:     PropTypes.string.isRequired,
  start_time:   PropTypes.string.isRequired,
  type:         PropTypes.string.isRequired,
});
