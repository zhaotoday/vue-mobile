import { computed } from "@vue/composition-api";
import { store } from "@/store";
import { PublicEnumsModel } from "../models/public/enums";

export const useEnums = () => {
  const enums = computed(() => store.state.enums.data);

  const getEnums = async () => {
    const { version } = await new PublicEnumsModel().POST({
      action: "getVersion",
    });

    if (version !== enums.config.version) {
      await store.dispatch("enums/get");
    }
  };

  return { enums, getEnums };
};
