import { createApi } from "../../utils/create-api";
import { useAuth } from "../../composables/use-auth";

export const usersApi = createApi({
  url: "/client/users",
  headers: useAuth().getHeaders,
});
