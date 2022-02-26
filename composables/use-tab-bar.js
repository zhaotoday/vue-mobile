import { reactive } from "@vue/composition-api";
import { onShow } from "uni-composition-api";
import wx from "wx-bridge";

export const useTabBar = () => {
  const currentRoute = reactive({
    query: {},
  });

  onShow(() => {
    const route = getRoute();
    const query = getQuery();

    if (Object.keys(query).length) {
      currentRoute.query = query;
      wx.removeStorageSync(route);
    }
  });

  const switchTab = (url, query) => {
    wx.switchTab({ url });
    wx.setStorageSync(url, query);
  };

  const getRoute = () => {
    const currentPage = getCurrentPages().pop();
    return currentPage && currentPage.route ? "/" + currentPage.route : "";
  };

  const getQuery = () => {
    const route = getRoute();

    return route ? wx.getStorageSync(route) || {} : {};
  };

  return {
    currentRoute,
    switchTab,
  };
};
