export const useFiltersStore = defineStore({
  id: "filters",
  state: () => ({
    priceRangeCurrent: 10000,
    priceRangeStep: 50,
  }),
  getters: {},
  actions: {
    setPriceRangeCurrent(value: number) {
      this.priceRangeCurrent = value;
    },
  },
});
