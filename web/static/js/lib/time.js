import moment from "moment";

// "HH" | "HH:mm" | "HH:mm:ss" | String -> MomentObject
// Returns 00:00:00 if input is invalid.
function parseTime(t) {
  let date;

  if (typeof(t) === "string") {
    date = new Date(0, 0, 0, ...t.split(":"));
  }
  else {
    date = new Date(0, 0, 0, 0, 0, 0);
  }
  date = moment(date);
  return date;
}

function castTime(t) {
  return parseTime(t).format("HH:mm:ss");
}

// MomentObject -> Number
// returns time t as a Number, percise to the minute.
function timeToNumber(t) {
  return t.hours() + t.minutes() / 60;
}

export default {
  castTime,
  parseTime,
  timeToNumber
};
