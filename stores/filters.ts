export const useFiltersStore = defineStore({
  id: "filters",
  state: () => ({
    priceRangeCurrent: 10000,
    priceRangeStep: 50,
  }),
  getters: {
    getPriceRangeCurrent: (state) => state.priceRangeCurrent,
  },
  actions: {
    setPriceRangeCurrent(value: number) {
      this.priceRangeCurrent = value;
    },
  },
});
