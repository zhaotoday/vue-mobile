import { Rest } from "../../utils/rest";
import { consts } from "@/utils/consts";

export class ApisModel extends Rest {
  constructor() {
    super();

    this.baseUrl = consts.ApiUrl;
    this.path = "wx/apis";
  }
}
