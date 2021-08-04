import { onShow } from "uni-composition-api";
import { reactive } from "@vue/composition-api";
import { router } from "@/router";

export const useCurrentRoute = () => {
  const currentRoute = reactive({
    query: {},
  });

  onShow(() => {
    currentRoute.query = router.currentRoute.query;
  });

  return {
    currentRoute,
  };
};