import { store } from "@/store";
import { createNamespacedHelpers } from "vuex-composition-helpers";

export const useAuth = () => {
  const { useState } = createNamespacedHelpers(store, "users");

  const getUser = () => {
    const { user } = useState(["user"]);

    return user.value || {};
  };

  const getToken = () => {
    const { token } = useState(["token"]);

    return token.value || "";
  };

  const loggedIn = () => {
    return getToken() && getUser().phoneNumber;
  };

  const getHeaders = () => {
    return loggedIn() ? { Authorization: `Bearer ${getToken()}` } : undefined;
  };

  return {
    getUser,
    getToken,
    loggedIn,
    getHeaders,
  };
};
