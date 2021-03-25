import { Rest } from "../../utils/rest";
import { consts } from "@/utils/consts";
import { auth } from "../../utils/auth";

export class WxWxUsersModel extends Rest {
  constructor() {
    super();

    this.baseUrl = consts.ApiUrl;
    this.headers = auth.getHeaders();
    this.path = "wx/wxUsers";
  }
}
