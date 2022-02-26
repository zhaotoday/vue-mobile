import { reactive } from "@vue/composition-api";
import { onLoad, onShow } from "uni-composition-api";
import wx from "wx-bridge";

export const useRoute = () => {
  const currentRoute = reactive({
    query: {},
  });

  onLoad((query) => {
    currentRoute.query = { ...query, ...getSwitchTabQuery() };
  });

  onShow(() => {
    const query = getSwitchTabQuery();

    if (Object.keys(query)) {
      currentRoute.query = query;
    }
  });

  const switchTab = (url, query) => {
    wx.switchTab({ url });
    wx.setStorageSync(url, JSON.stringify(query));
  };

  const getSwitchTabQuery = () => {
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
