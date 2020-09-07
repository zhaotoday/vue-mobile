import wxb from "wx-bridge";
import helpers from "jt-helpers";

wxb.showToast = helpers.intercept(wxb.showToast, {
  req(options) {
    return !options.icon ? { ...options, icon: "none" } : options;
  }
});

wxb.navigateTo = helpers.intercept(wxb.navigateTo, {
  req(options) {
    return {
      animationType: "slide-in-right",
      animationDuration: 200,
      ...options
    };
  }
});

export default wxb;
