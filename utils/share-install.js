import { wx } from "./wx";

const openInstall = uni.requireNativePlugin("openinstall-plugin");

export const shareInstall = {
  init() {
    openInstall.init();
  },
  getInstall() {
    openInstall.getInstall(8, ({ channelCode, bindData }) => {
      wx.setStorageSync("channelCode", channelCode);
      wx.setStorageSync("bindData", bindData);
    });
  },
  registerWakeUp() {
    openInstall.registerWakeUp(({ channelCode, bindData }) => {
      wx.setStorageSync("channelCode", channelCode);
      wx.setStorageSync("bindData", bindData);
    });
  },
  getData() {
    return {
      channelCode: wx.getStorageSync("channelCode"),
      bindData: JSON.parse(wx.getStorageSync("bindData") || "{}")
    };
  }
};
