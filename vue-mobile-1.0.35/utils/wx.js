import wx from "wx-bridge";
import helpers from "jt-helpers";

wx.showToast = helpers.intercept(wx.showToast, {
  req(options) {
    return !options.icon ? { ...options, icon: "none" } : options;
  }
});

wx.navigateTo = helpers.intercept(wx.navigateTo, {
  req(options) {
    return {
      animationType: "slide-in-right",
      animationDuration: 200,
      ...options
    };
  }
});

export { wx };
