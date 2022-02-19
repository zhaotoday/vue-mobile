import { store } from "@/store";
import { createNamespacedHelpers } from "vuex-composition-helpers";

export const useAuth = () => {
  const { useState } = createNamespacedHelpers(store, "users");

  const getToken = () => {
    const { token } = useState(["token"]);

    return token.value || "";
  };

  const getHeaders = () => {
    return { Authorization: `Bearer ${getToken()}` };
  };

  const loggedIn = () => {
    return !!getToken();
  };

  return {
    getToken,
    getHeaders,
    loggedIn,
  };
};
