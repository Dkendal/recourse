import moment from "moment";

function toTime(string) {
  return moment(string, "HH:mm").toDate();
}

function toDate(string) {
  return moment(string, "YYYY-MM-DD").toDate();
}

function toColor(mt) {
  function toNum(str) {
    let value = 0;

    for (let idx = 0; idx < str.length; idx++) {
      value += str.charCodeAt(idx);
    }

    return value
  }

  const course = mt.section.course;
  const {subject, number} = course

  const hue = (toNum(subject) ** 5 + toNum(number)) * 16 % 255;

  return `hsl(${hue},${80}%,${70}%)`;
}

export function cast(mt) {
  const start_time = toTime(mt.start_time);
  const end_time = toTime(mt.end_time);
  const date_end = toDate(mt.date_end)
  const date_start = toDate(mt.date_start)
  const fill = toColor(mt)

  return {
    ...mt,
    date_end,
    date_start,
    end_time,
    fill,
    start_time,
  }
}
