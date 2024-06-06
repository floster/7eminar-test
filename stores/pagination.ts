import {} from "~/stores/employees";

export const usePaginationStore = defineStore({
  id: "pagination",
  state: () => ({
    currentPage: 1,
    totalPages: 1,
    perPage: 3,
  }),
  getters: {
    getTotalPages(state): number {
      return Math.ceil(useEmployeesStore().getTotalEmployees / state.perPage);
    },
  },
  actions: {
    setCurrentPage(page: number) {
      this.currentPage = page;
    },
  },
});
