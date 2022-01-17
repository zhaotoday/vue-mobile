import { createApi } from "../../utils/create-api";
import { useAuth } from "../../composables/use-auth";

export const usersApi = createApi({
  headers: useAuth().getHeaders(),
  url: "/client/users",
});
