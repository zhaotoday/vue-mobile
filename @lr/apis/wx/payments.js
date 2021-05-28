import { Rest } from "../../utils/rest";
import { auth } from "../../utils/auth";
import { consts } from "@/utils/consts";

export class PaymentsApi extends Rest {
  constructor() {
    super();

    this.baseUrl = consts.ApiUrl;
    this.headers = auth.getHeaders();
    this.path = "wx/payments";
  }
}
