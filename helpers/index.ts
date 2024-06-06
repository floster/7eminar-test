import { v4 as uuid } from "uuid";
import { format } from "date-fns";
import type { Event, Employee, Events } from "../types";

import { type EmployeeSchema } from "~/schemas";

export const createEmployee = (data: EmployeeSchema): Employee => {
  console.log("events", data.events);

  return {
    id: uuid(),
    name: data.employee_name,
    surname: data.employee_surname,
    description: data.employee_description,
    events: (data.events as Events) || [],
  };
};

export const createEmptyEvent = (date: string): Event => ({
  id: uuid(),
  date: format(new Date(date), "dd-MM-yyyy"),
  period: { start: "10:00", end: "10:30" },
  kind: undefined,
  price: 0,
});
