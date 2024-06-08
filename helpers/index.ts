import { v4 as uuid } from "uuid";
import type { Event, Employee, Events, TimePeriod } from "../types";

import moment from "moment";

import { type EmployeeSchema } from "~/schemas";

// get the time with minutes rounded to the nearest quarter (15 minutes)
const roundToNearestQuarterHour = (): TimePeriod<string> => {
  const date = new Date();
  const minutes = date.getMinutes();
  const roundedMinutes = Math.round(minutes / 15) * 15;
  const _start = new Date(date.setMinutes(roundedMinutes));
  const _end = new Date(date.setMinutes(roundedMinutes + 30));
  return {
    start: _start.toLocaleTimeString("uk-UA", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    end: _end.toLocaleTimeString("uk-UA", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
};

export const createEmployee = (data: EmployeeSchema): Employee => ({
  id: uuid(),
  name: data.employee_name,
  surname: data.employee_surname,
  description: data.employee_description,
  events: (data.events as Events) || [],
});

export const createEmptyEvent = (date: string): Event => {
  return {
    id: uuid(),
    dateCreated: new Date(),
    date: new Date(date),
    period: roundToNearestQuarterHour(),
    kind: undefined,
    price: 0,
  };
};

export const filterEventsByMaxPrice = (
  events: Events,
  maxPrice: number
): Events => events.filter((event) => event.price <= maxPrice);

export const sortEventsByDate = (
  events: Events,
  direction: "asc" | "desc" = "asc"
): Events =>
  events.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return direction === "asc" ? dateA - dateB : dateB - dateA;
  });

// date/time tests
export const isTimeSameOrBefore = (startTime: string, endTime: string) => {
  return moment(startTime, "HH:mm").isSameOrBefore(moment(endTime, "HH:mm"));
};

export const isTimeSameOrAfter = (startTime: string, endTime: string) => {
  return moment(endTime, "HH:mm").isSameOrAfter(moment(startTime, "HH:mm"));
};

export const isTimeBetween = (start: string, end: string, time: string) => {
  return moment(time, "HH:mm").isBetween(
    moment(start, "HH:mm"),
    moment(end, "HH:mm"),
    "minute",
    "[]"
  );
};
