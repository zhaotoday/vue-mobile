import wx from "wx-bridge";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import { store } from "@/store";

export const useWxUser = () => {
  const { useState, useActions } = createNamespacedHelpers(store, "wxUsers");
  const { wxUser, token, openId } = useState(["wxUser", "token", "openId"]);
  const actions = useActions(["login", "getWxUser", "getToken", "getOpenId"]);

  const loggedIn = () => {
    return !!token.value;
  };
  const getWxUser = () => actions.getWxUser();
  const getToken = () => actions.getToken();
  const getOpenId = () => actions.getOpenId();
  const navigateTo = ({
    requiresLogin = false,
    loginUrl = "/pages/login/index",
    url,
  }) => {
    wx.navigateTo({
      url: requiresLogin && !loggedIn() ? loginUrl : url,
    });
  };

  return {
    wxUser,
    token,
    openId,
    loggedIn,
    getWxUser,
    getToken,
    getOpenId,
    navigateTo,
  };
};
