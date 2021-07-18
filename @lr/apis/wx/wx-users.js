import { Rest } from "../../utils/rest";
import { auth } from "../../utils/auth";
import { useConsts } from "@/composables/use-consts";

export class WxUsersApi extends Rest {
  constructor() {
    super();

    this.baseUrl = useConsts().ApiUrl;
    this.headers = auth.getHeaders();
    this.path = "wx/wxUsers";
  }
}
