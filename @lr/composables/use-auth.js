import { createNamespacedHelpers } from "vuex-composition-helpers";
import { store } from "@/store";

export const useAuth = () => {
  return {
    getToken() {
      const { useState } = createNamespacedHelpers(store, "wxUsers");
      const { token } = useState(["token"]);

      return token.value || "";
    },
    getHeaders() {
      return { Authorization: this.getToken() };
    },
    loggedIn() {
      return !!this.getToken();
    },
  };
};
