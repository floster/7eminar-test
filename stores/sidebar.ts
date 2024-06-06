export const useSidebarStore = defineStore({
  id: "sidebar",
  state: () => ({
    isOpen: false,
    title: "Sidebar",
    editedUserId: null as string | null,
  }),
  getters: {},
  actions: {
    open(id: string | null = null) {
      this.editedUserId = id;
      this.title = id ? "Edit user" : "Create user";
      this.isOpen = true;
    },
    close() {
      this.editedUserId = null;
      this.isOpen = false;
    },
    toggle() {
      this.isOpen = !this.isOpen;
    },
    setTitle(title: string) {
      this.title = title;
    },
  },
});
