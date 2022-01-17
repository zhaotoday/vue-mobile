import { createApi } from "../../utils/create-api";
import { useAuth } from "../../composables/use-auth";

export const wxPaymentsApi = createApi({
  headers: useAuth().getHeaders(),
  url: "/client/wxPayments",
});
