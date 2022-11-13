import { createApi } from "../../utils/create-api";
import { store } from "@/store";

export const wxPaymentsApi = createApi({
  url: "/client/wxPayments",
  headers: () => ({
    authorization: `Bearer ${store.state.users.token}`,
  }),
});
