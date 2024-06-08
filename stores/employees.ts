import type { Employee } from "~/types";
// import { EventKinds } from "~/types";

import { usePaginationStore } from "~/stores/pagination";

export const useEmployeesStore = defineStore("employees", {
  state: () => ({
    employees: [
      {
        id: "1d736252-91e6-48e9-b144-587064b3c0d0",
        name: "Petro",
        surname: "Bamper",
        description: "A very good specialist",
        events: [
          // {
          //   id: "424a04c6-c43d-423b-b07a-cabafc1af2e8",
          //   date: "Thu Jun 21 2024 00:00:00 GMT+0300 (Eastern European Summer Time)" as unknown as Date,
          //   period: { start: "10:00", end: "11:00" },
          //   kind: "Online consultation",
          //   price: 50,
          // },
          // {
          //   id: "424a04c6-c43d-423b-b07a-cabafc1af2e8",
          //   date: "Thu Jun 20 2024 00:00:00 GMT+0300 (Eastern European Summer Time)" as unknown as Date,
          //   period: { start: "12:15", end: "12:45" },
          //   kind: "Offline consultation",
          //   price: 3000,
          // },
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
    getEmployeeEventsByDate: (state) => (id: string, date: Date) => {
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
      const result = Math.min(
        ...state.employees.flatMap((employee) =>
          employee.events.map((event) => event.price)
        )
      );
      return isFinite(result) ? result : 0;
    },
    getMaxPrice: (state) => {
      const result = Math.max(
        ...state.employees.flatMap((employee) =>
          employee.events.map((event) => event.price)
        )
      );
      return isFinite(result) ? result : 0;
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
  persist: true,
});
