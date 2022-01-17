import { createApi } from "../../utils/create-api";
import { useAuth } from "../../composables/use-auth";

export const wxApisApi = createApi({
  headers: useAuth().getHeaders(),
  url: "/client/wxApis",
});
