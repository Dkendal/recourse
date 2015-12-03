import moment from "moment";

// castTime(String) :: "%H:%M:%S"
// Cast input value to formatted time string.
// Returns 00:00:00 if input is invalid.
function parseTime(t) {
  let date = new Date(0, 0, 0, 0, 0, 0);

  if (typeof(t) == "string") {
    date = new Date(0, 0, 0, ...t.split(":"));
  }

  return date;
}

function castTime(t) {
  return moment(parseTime(t)).format("HH:mm:ss");
}

export default {
  parseTime,
  castTime
};
