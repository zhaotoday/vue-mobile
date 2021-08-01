import { Rest } from "../../utils/rest";
import { useAuth } from "../../composables/use-auth";
import { useConsts } from "@/composables/use-consts";

export class UsersApi extends Rest {
  constructor() {
    super();

    this.baseUrl = useConsts().ApiUrl;
    this.headers = useAuth().getHeaders();
    this.path = "client/users";
  }
}
