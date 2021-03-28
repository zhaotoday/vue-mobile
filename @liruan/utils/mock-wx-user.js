import { store } from "@/store";
const { wxUser, token } = require("@/mock-wx-user.json");

export default {
  login() {
    store.commit("wxUsers/SetWxUser", wxUser);
    store.commit("wxUsers/SetToken", token);
    return { wxUser, token };
  },
};
