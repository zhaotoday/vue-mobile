import { reactive } from "@vue/composition-api";
import { onLoad } from "uni-composition-api";

export const useRoute = () => {
  const currentRoute = reactive({
    query: {},
  });

  onLoad((query) => {
    currentRoute.query = query;
  });

  return {
    currentRoute,
  };
};
