import moment from "moment";

const timeFormat = "HH:mm";
const dateFormat = "YYYY-MM-DD";

function parseTime(string) {
  return moment(string, timeFormat).toDate();
}

function parseDate(string) {
  return moment(string, dateFormat).toDate();
}

function formatTime(date) {
  return moment(date).format(timeFormat);
};

function formatDate(date) {
  return moment(date).format(dateFormat);
};

export default {
  parseTime,
  parseDate,
  formatTime,
  formatDate,
};
