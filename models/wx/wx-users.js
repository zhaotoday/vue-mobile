import REST from "../../utils/rest";
import restHelpers from "../../utils/helpers/rest-helpers";
import consts from "@/utils/consts";

export default class extends REST {
  constructor() {
    super();

    this.baseURL = consts.API_URL;
    this.headers = restHelpers.getHeaders();
    this.path = "wx/wxUsers";
  }
}
