import moment from "moment";

function toTime(string) {
  return moment(string, "HH:mm").toDate();
}

function toDate(string) {
  return moment(string, "YYYY-MM-DD").toDate();
}

export function cast(mt) {
  const start_time = toTime(mt.start_time);
  const end_time = toTime(mt.end_time);
  const date_end = toDate(mt.date_end)
  const date_start = toDate(mt.date_start)

  return {
    ...mt,
    start_time,
    end_time,
    date_end,
    date_start,
  }
}
