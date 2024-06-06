import { v4 as uuid } from "uuid";
import { format } from "date-fns";
import type { Event, Employee, Events, EventKinds } from "../types";

import { type EmployeeSchema } from "~/schemas";

export const createEmployee = (data: EmployeeSchema): Employee => ({
  id: uuid(),
  name: data.employee_name,
  surname: data.employee_surname,
  description: data.employee_description,
  events: (data.events as Events) || [],
});

export const createEmptyEvent = (date: string): Event => ({
  id: uuid(),
  date: format(new Date(date), "dd-MM-yyyy"),
  period: { start: "10:00", end: "10:30" },
  kind: undefined,
  price: 0,
});

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

export const timeToPlainNumber = (time: string): number =>
  parseInt(time.replace(":", ""));

export interface PlainTimePeriod {
  start: number;
  end: number;
}

export const getEventsTimeIntervals = (
  events: Events,
  kind: EventKinds | undefined
): PlainTimePeriod[] | null => {
  if (!kind) return null;
  return events
    .filter((events) => events.kind === kind)
    .map((event) => ({
      start: timeToPlainNumber(event.period.start),
      end: timeToPlainNumber(event.period.end),
    }));
};

export const isTimeOverlapIntervals = (
  time: number,
  events: Events,
  kind: EventKinds | undefined
): boolean => {
  const intervals = getEventsTimeIntervals(events, kind);
  if (!intervals) return false;

  return intervals.some((e) => time >= e.start && time <= e.end);
};
