import { Rest } from "@/utils/rest";
import { consts } from "@/utils/consts";

export class PublicEnumsModel extends Rest {
  constructor() {
    super();

    this.baseUrl = `${consts.ApiUrl}/public`;
    this.path = "public/enums";
  }
}
