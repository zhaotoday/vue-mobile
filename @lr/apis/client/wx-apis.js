import { createApi } from "../../utils/create-api";
import { useAuth } from "../../composables/use-auth";

export const wxApisApi = createApi({
  url: "/client/wxApis",
  getHeaders: useAuth().getHeaders,
});
