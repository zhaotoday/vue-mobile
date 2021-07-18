import { Rest } from "../../utils/rest";
import { useConsts } from "@/composables/use-consts";

export class ApisApi extends Rest {
  constructor() {
    super();

    this.baseUrl = useConsts().ApiUrl;
    this.path = "wx/apis";
  }
}
