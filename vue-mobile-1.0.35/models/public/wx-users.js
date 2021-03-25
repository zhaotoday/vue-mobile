import REST from "../../utils/rest";
import consts from "@/utils/consts";

export default class extends REST {
  constructor() {
    super();

    this.baseURL = consts.ApiUrl;
    this.path = "public/wxUsers";
  }
}
