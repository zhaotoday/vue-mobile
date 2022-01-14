import { onShow } from "@dcloudio/uni-app";
import { reactive } from "vue";
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
