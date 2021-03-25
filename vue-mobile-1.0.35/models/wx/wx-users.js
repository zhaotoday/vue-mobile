import REST from "../../utils/rest";
import auth from "../../utils/auth";
import consts from "@/utils/consts";

export default class extends REST {
  constructor() {
    super();

    this.baseURL = consts.ApiUrl;
    this.headers = auth.getHeaders();
    this.path = "wx/wxUsers";
  }
}
