import { createNamespacedHelpers } from "vuex-composition-helpers";
import { store } from "@/store";

export const useAuth = () => {
  const getToken = () => {
    const { useState } = createNamespacedHelpers(store, "wxUsers");
    const { token } = useState(["token"]);

    return token.value || "";
  };

  const getHeaders = () => {
    return { Authorization: getToken() };
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
