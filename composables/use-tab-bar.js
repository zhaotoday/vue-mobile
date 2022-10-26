import { reactive } from "@vue/composition-api";
import { onShow } from "uni-composition-api";

export const useTabBar = () => {
  const currentRoute = reactive({
    query: {},
  });

  onShow(() => {
    const route = getRoute();
    const query = getQuery();

    if (Object.keys(query).length) {
      currentRoute.query = query;
      uni.removeStorageSync(route);
    }
  });

  const switchTab = (url, query) => {
    uni.switchTab({ url });
    uni.setStorageSync(url, query);
  };

  const getRoute = () => {
    const currentPage = getCurrentPages().pop();
    return currentPage && currentPage.route ? "/" + currentPage.route : "";
  };

  const getQuery = () => {
    const route = getRoute();

    return route ? uni.getStorageSync(route) || {} : {};
  };

  return {
    currentRoute,
    switchTab,
  };
};
