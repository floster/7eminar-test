import type { Employee } from "~/types";
import { EventKinds } from "~/types";

import { usePaginationStore } from "~/stores/pagination";

export const useEmployeesStore = defineStore({
  id: "employees",
  state: () => ({
    employees: [
      // yet another employee with 5 events
      {
        id: "3",
        name: "John",
        surname: "Smith",
        description: "a very good employee",
        events: [
          {
            id: "1",
            date: "2021-12-12",
            period: { start: "12:00", end: "13:00" },
            kind: EventKinds.Offline,
            price: 2500,
          },
          {
            id: "2",
            date: "2021-12-13",
            period: { start: "12:00", end: "13:00" },
            kind: EventKinds.Online,
            price: 500,
          },
          {
            id: "3",
            date: "2021-12-14",
            period: { start: "12:00", end: "13:00" },
            kind: EventKinds.Phone,
            price: 750,
          },
          {
            id: "4",
            date: "2021-12-15",
            period: { start: "12:00", end: "13:00" },
            kind: EventKinds.Offline,
            price: 1000,
          },
          {
            id: "5",
            date: "2021-12-16",
            period: { start: "12:00", end: "13:00" },
            kind: EventKinds.Online,
            price: 500,
          },
        ],
      },
      {
        id: "1",
        name: "John",
        surname: "Doe",
        description: "a very good employee",
        events: [
          {
            id: "1",
            date: "2021-12-12",
            period: { start: "13:30", end: "13:45" },
            kind: EventKinds.Offline,
            price: 100,
          },
          {
            id: "2",
            date: "2021-12-13",
            period: { start: "18:00", end: "19:30" },
            kind: EventKinds.Online,
            price: 50,
          },
        ],
      },
      {
        id: "2",
        name: "Jane",
        surname: "Doe",
        description: "a very good employee",
        events: [
          {
            id: "1",
            date: "2021-12-12",
            period: { start: "12:00", end: "13:00" },
            kind: EventKinds.Offline,
            price: 100,
          },
          {
            id: "2",
            date: "2021-12-13",
            period: { start: "12:00", end: "13:00" },
            kind: EventKinds.Online,
            price: 50,
          },
        ],
      },
      {
        id: "3",
        name: "John",
        surname: "Smith",
        description: "a very good employee",
        events: [
          {
            id: "1",
            date: "2021-12-12",
            period: { start: "12:00", end: "13:00" },
            kind: EventKinds.Offline,
            price: 2500,
          },
          {
            id: "2",
            date: "2021-12-13",
            period: { start: "12:00", end: "13:00" },
            kind: EventKinds.Online,
            price: 500,
          },
          {
            id: "3",
            date: "2021-12-14",
            period: { start: "12:00", end: "13:00" },
            kind: EventKinds.Phone,
            price: 750,
          },
          {
            id: "4",
            date: "2021-12-15",
            period: { start: "12:00", end: "13:00" },
            kind: EventKinds.Offline,
            price: 1000,
          },
          {
            id: "5",
            date: "2021-12-16",
            period: { start: "12:00", end: "13:00" },
            kind: EventKinds.Online,
            price: 500,
          },
        ],
      },
    ] as Employee[],
  }),
  getters: {
    getEmployeeById: (state) => (id: string) =>
      state.employees.find((employee) => employee.id === id),
    getTotalEmployees: (state) => state.employees.length,
    getEmployeesPage: (state) => {
      const { currentPage, perPage } = usePaginationStore();
      const start = (currentPage - 1) * perPage;
      const end = start + perPage;
      return state.employees.slice(start, end);
    },
    getMinPrice: (state) => {
      return Math.min(
        ...state.employees.flatMap((employee) =>
          employee.events.map((event) => event.price)
        )
      );
    },
    getMaxPrice: (state) => {
      return Math.max(
        ...state.employees.flatMap((employee) =>
          employee.events.map((event) => event.price)
        )
      );
    },
  },
  actions: {
    createEmployee(employee: Employee) {
      this.employees = [employee, ...this.employees];
    },
    updateEmployee(id: string, employee: Employee) {
      const index = this.employees.findIndex((employee) => employee.id === id);
      if (index !== -1) {
        this.employees[index] = employee;
      }
    },
    deleteEmployee(id: string | null | undefined) {
      if (!id) return;
      this.employees = this.employees.filter((employee) => employee.id !== id);
    },
    deleteEvent(employeeId: string, eventId: string) {
      const employee = this.employees.find(
        (employee) => employee.id === employeeId
      );
      if (!employee) return;
      employee.events = employee.events.filter((event) => event.id !== eventId);
    },
  },
});
