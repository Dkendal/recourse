import moment from "moment";
import { toColor } from "./course";
import t from "./time";

export function castDates(mt) {
  const start_time = t.parseTime(mt.start_time);
  const end_time = t.parseTime(mt.end_time);
  const date_end = t.parseDate(mt.date_end)
  const date_start = t.parseDate(mt.date_start)

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
