import { store } from "@/store";

const { user, token } = require("@/mock/user.json");

export const useMockUser = () => {
  const login = () => {
    store.commit("users/SetUser", user);
    store.commit("users/SetToken", `Bearer ${token}`);
    return { user, token };
  };

  return {
    login,
  };
};
