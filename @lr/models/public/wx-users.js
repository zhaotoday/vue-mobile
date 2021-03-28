import { Rest } from "../../utils/rest";
import { consts } from "@/utils/consts";

export class PublicWxUsersModel extends Rest {
  constructor() {
    super();

    this.baseUrl = consts.ApiUrl;
    this.path = "public/wxUsers";
  }
}
