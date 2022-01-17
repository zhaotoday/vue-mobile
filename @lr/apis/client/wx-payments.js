import { createApi } from "../../utils/create-api";
import { useAuth } from "../../composables/use-auth";

export const wxPaymentsApi = createApi({
  url: "/client/wxPayments",
  headers: useAuth().getHeaders(),
});
