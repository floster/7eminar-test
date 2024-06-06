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
            date: "12-12-2021",
            period: { start: "12:00", end: "13:00" },
            kind: EventKinds.Offline,
            price: 2500,
          },
          {
            id: "2",
            date: "12-12-2021",
            period: { start: "15:00", end: "18:00" },
            kind: EventKinds.Offline,
            price: 500,
          },
          {
            id: "3",
            date: "12-12-2021",
            period: { start: "08:00", end: "09:30" },
            kind: EventKinds.Phone,
            price: 750,
          },
          {
            id: "4",
            date: "15-12-2021",
            period: { start: "12:00", end: "13:00" },
            kind: EventKinds.Offline,
            price: 1000,
          },
          {
            id: "5",
            date: "15-12-2021",
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
            date: "13-12-2021",
            period: { start: "13:30", end: "13:45" },
            kind: EventKinds.Offline,
            price: 100,
          },
          {
            id: "2",
            date: "12-12-2021",
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
            date: "12-12-2021",
            period: { start: "12:00", end: "13:00" },
            kind: EventKinds.Offline,
            price: 100,
          },
          {
            id: "2",
            date: "12-12-2021",
            period: { start: "12:00", end: "13:00" },
            kind: EventKinds.Online,
            price: 50,
          },
        ],
      },
      {
        id: "30",
        name: "John",
        surname: "Smith",
        description: "a very good employee",
        events: [
          {
            id: "1",
            date: "12-12-2021",
            period: { start: "12:00", end: "13:00" },
            kind: EventKinds.Offline,
            price: 2500,
          },
          {
            id: "2",
            date: "12-12-2021",
            period: { start: "12:00", end: "13:00" },
            kind: EventKinds.Online,
            price: 500,
          },
          {
            id: "3",
            date: "12-12-2021",
            period: { start: "12:00", end: "13:00" },
            kind: EventKinds.Phone,
            price: 750,
          },
          {
            id: "4",
            date: "12-12-2021",
            period: { start: "12:00", end: "13:00" },
            kind: EventKinds.Offline,
            price: 1000,
          },
          {
            id: "5",
            date: "12-12-2021",
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
    getEmployeeEvents: (state) => (id: string) => {
      const employee = state.employees.find((employee) => employee.id === id);
      return employee ? employee.events : [];
    },
    getEmployeeEventsByDate: (state) => (id: string, date: string) => {
      const employee = state.employees.find((employee) => employee.id === id);
      return employee
        ? employee.events.filter((event) => event.date === date)
        : [];
    },
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
