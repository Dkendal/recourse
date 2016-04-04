import moment from "moment";

const TIME_SHORT_FORMAT = "HH:mm";
const DATE_FORMAT = "YYYY-MM-DD";
const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";

function parseTime(string) {
  return moment(string, TIME_SHORT_FORMAT).toDate();
}

function parseDate(string) {
  return moment(string, DATE_FORMAT).toDate();
}

function formatTime(date) {
  return moment(date).format(TIME_SHORT_FORMAT);
};

function formatDate(date) {
  return moment(date).format(DATE_FORMAT);
};

function formatDateTime(date) {
  return moment(date).format(DATE_TIME_FORMAT);
};

export default {
  parseTime,
  parseDate,
  formatTime,
  formatDate,
  formatDateTime,
};
