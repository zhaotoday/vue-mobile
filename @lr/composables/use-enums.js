import { store } from "@/store";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import { PublicEnumsApi } from "../apis/public/enums";

export const useEnums = () => {
  const { useState, useActions } = createNamespacedHelpers(store, "enums");
  const { data: enums } = useState(["data"]);
  const { get } = useActions(["get"]);

  const getEnums = async () => {
    const { version } = await new PublicEnumsApi().post({
      action: "getVersion",
    });

    if (version !== enums.value.config.version) {
      await get();
    }
  };

  return { enums, getEnums };
};
