import { defineStore } from "pinia";
import type { Employee } from "~/types";
import { EventKinds } from "~/types";

export const useEmployeesStore = defineStore({
  id: "employees",
  state: () => ({
    employees: [
      {
        id: 1,
        name: "John",
        surname: "Doe",
        description: "a very good employee",
        events: [
          {
            id: 1,
            date: "2021-12-12",
            period: { start: "13:30", end: "13:45" },
            kind: EventKinds.Offline,
            price: 100,
          },
          {
            id: 2,
            date: "2021-12-13",
            period: { start: "18:00", end: "19:30" },
            kind: EventKinds.Online,
            price: 50,
          },
        ],
      },
      {
        id: 2,
        name: "Jane",
        surname: "Doe",
        description: "a very good employee",
        events: [
          {
            id: 1,
            date: "2021-12-12",
            period: { start: "12:00", end: "13:00" },
            kind: EventKinds.Offline,
            price: 100,
          },
          {
            id: 2,
            date: "2021-12-13",
            period: { start: "12:00", end: "13:00" },
            kind: EventKinds.Online,
            price: 50,
          },
        ],
      },
      // yet another employee with 5 events
      {
        id: 3,
        name: "John",
        surname: "Smith",
        description: "a very good employee",
        events: [
          {
            id: 1,
            date: "2021-12-12",
            period: { start: "12:00", end: "13:00" },
            kind: EventKinds.Offline,
            price: 100,
          },
          {
            id: 2,
            date: "2021-12-13",
            period: { start: "12:00", end: "13:00" },
            kind: EventKinds.Online,
            price: 50,
          },
          {
            id: 3,
            date: "2021-12-14",
            period: { start: "12:00", end: "13:00" },
            kind: EventKinds.Phone,
            price: 75,
          },
          {
            id: 4,
            date: "2021-12-15",
            period: { start: "12:00", end: "13:00" },
            kind: EventKinds.Offline,
            price: 100,
          },
          {
            id: 5,
            date: "2021-12-16",
            period: { start: "12:00", end: "13:00" },
            kind: EventKinds.Online,
            price: 50,
          },
        ],
      },
    ] as Employee[],
  }),
  getters: {
    getEmployeeById: (state) => (id: number) => {
      return state.employees.find((employee) => employee.id === id);
    },
  },
  actions: {},
});
