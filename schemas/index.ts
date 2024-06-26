import { object, array, string, number, date, type InferType } from "yup";

import { isTimeSameOrAfter, isTimeSameOrBefore } from "~/helpers";

export const employeeSchema = object({
  employee_name: string()
    .max(20, "20 characters max")
    .required("required field"),
  employee_surname: string()
    .max(50, "30 characters max")
    .required("required field"),
  employee_description: string().max(500, "500 characters max"),
  event_date: date(),
  events: array().of(
    object({
      period: object({
        start: string()
          .required("required field")
          .matches(
            /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
            "should be a time, e.g. 12:00"
          )
          .test(
            "is-same-or-before",
            "start time should be before end time",
            function (value) {
              return isTimeSameOrBefore(value, this.parent.end);
            }
          ),
        end: string()
          .required("required field")
          .matches(
            /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
            "should be a time, e.g. 12:00"
          )
          .test(
            "is-same-or-after",
            "end time should be after start time",
            function (value) {
              return isTimeSameOrAfter(this.parent.start, value);
            }
          ),
      }),
      price: number()
        .typeError("price should be a number")
        .required("required field")
        .max(3000, "price should be equal or less than 3000"),
      kind: string().required("required field"),
    })
  ),
});

export type EmployeeSchema = InferType<typeof employeeSchema>;
