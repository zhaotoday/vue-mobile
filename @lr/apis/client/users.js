import { createApi } from "../../utils/create-api";
import { store } from "@/store";

export const usersApi = createApi({
  url: "/client/users",
  headers: () => ({
    authorization: `Bearer ${store.state.users.token}`,
  }),
});
