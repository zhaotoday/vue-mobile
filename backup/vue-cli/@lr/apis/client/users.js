import { Rest } from "../../utils/rest";
import { useConsts } from "@/composables/use-consts";
import { useUser } from "../../composables/use-user";

export class UsersApi extends Rest {
  constructor() {
    super();

    this.baseUrl = useConsts().ApiUrl;
    this.headers = useUser().getHeaders();
    this.path = "client/users";
  }
}
