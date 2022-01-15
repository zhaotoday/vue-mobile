import { Rest } from "../../utils/rest";
import { useAuth } from "../../composables/use-auth";
import { useConsts } from "@/composables/use-consts";

export class WxUsersApi extends Rest {
  constructor() {
    super();

    this.baseUrl = useConsts().ApiUrl;
    this.headers = useAuth().getHeaders();
    this.path = "wx/wxUsers";
  }
}
