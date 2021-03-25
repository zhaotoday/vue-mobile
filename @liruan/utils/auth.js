import { store } from "@/store";

export const auth = {
  getUser() {
    return store.state.uc.user || {};
  },
  getToken() {
    return store.state.uc.token || "";
  },
  getHeaders() {
    return { Authorization: this.getToken() };
  },
  loggedIn() {
    return !!this.getToken();
  }
};
