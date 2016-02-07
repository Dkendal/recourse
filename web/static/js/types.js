import {PropTypes} from "react";

export const DATE = PropTypes.shape({
  days:    PropTypes.number.isRequired,
  months:  PropTypes.number.isRequired,
  years:   PropTypes.number.isRequired,
});

export const TIME = PropTypes.shape({
  hours:    PropTypes.number.isRequired,
  minutes:  PropTypes.number.isRequired,
  seconds:  PropTypes.number.isRequired,
});

export const COURSE = PropTypes.shape({
  description:  PropTypes.string,
  id:           PropTypes.number.isRequired,
  number:       PropTypes.string.isRequired,
  subject:      PropTypes.string.isRequired,
  title:        PropTypes.string.isRequired,
});

export const SECTION = PropTypes.shape({
  campus:                PropTypes.string.isRequired,
  course:                COURSE.isRequired,
  credits:               PropTypes.number.isRequired,
  instructional_method:  PropTypes.string.isRequired,
  registration_code:     PropTypes.string.isRequired,
  registration_end:      DATE.isRequired,
  registration_start:    DATE.isRequired,
  schedule_type:         PropTypes.string.isRequired,
});

export const MEETING_TIME = PropTypes.shape({
  date_end:     DATE.isRequired,
  date_start:   DATE.isRequired,
  days:         PropTypes.arrayOf(PropTypes.string).isRequired,
  instructors:  PropTypes.arrayOf(PropTypes.string).isRequired,
  location:     PropTypes.string.isRequired,
  end_time:     TIME.isRequired,
  start_time:   TIME.isRequired,
  type:         PropTypes.string.isRequired,
});
