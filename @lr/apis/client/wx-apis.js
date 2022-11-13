import { createApi } from "../../utils/create-api";
import { store } from "@/store";

export const wxApisApi = createApi({
  url: "/client/wxApis",
  headers: () => ({
    authorization: `Bearer ${store.state.users.token}`,
  }),
});
