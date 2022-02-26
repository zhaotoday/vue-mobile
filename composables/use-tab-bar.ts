import { reactive } from "@vue/composition-api";
import { onShow } from "uni-composition-api";
import wx from "wx-bridge";

export const useTabBar = () => {
  const currentRoute = reactive({
    query: {},
  });

  onShow(() => {
    const query = getQuery();

    if (Object.keys(query)) {
      currentRoute.query = query;
    }
  });

  const switchTab = (url, query) => {
    wx.switchTab({ url });
    wx.setStorageSync(url, JSON.stringify(query));
  };

  const getQuery = () => {
    const currentPage = getCurrentPages().pop();

    return currentPage && currentPage.route
      ? JSON.parse(wx.getStorageSync("/" + currentPage.route))
      : {};
  };

  return {
    currentRoute,
    switchTab,
  };
};
