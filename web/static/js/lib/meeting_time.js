import moment from "moment";
import { toColor } from "./course";

function toTime(string) {
  return moment(string, "HH:mm").toDate();
}

function toDate(string) {
  return moment(string, "YYYY-MM-DD").toDate();
}

export function castDates(mt) {
  const start_time = toTime(mt.start_time);
  const end_time = toTime(mt.end_time);
  const date_end = toDate(mt.date_end)
  const date_start = toDate(mt.date_start)

  return {
    ...mt,
    date_end,
    date_start,
    end_time,
    start_time,
  }
}

export function cast(mt) {
  const fill = toColor(mt.section.course);

  return {
    ...castDates(mt),
    fill,
  }
}
