import wx from "wx-bridge";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import { store } from "@/store";

export const useWxUser = () => {
  const { useState, useActions } = createNamespacedHelpers(store, "wxUsers");
  const { wxUser, token, openId } = useState(["wxUser", "token", "openId"]);
  const {
    login,
    mpLogin,
    oaLogin,
    appLogin,
    getWxUser,
    getToken,
    getOpenId,
    logout,
  } = useActions([
    "login",
    "mpLogin",
    "oaLogin",
    "appLogin",
    "getWxUser",
    "getToken",
    "getOpenId",
    "logout",
  ]);

  const getUserProfileAndLogin = async () => {
    const { iv, encryptedData } = await wx.getUserProfile({
      desc: "完善用户资料",
    });
    const { code } = await wx.login();
    return login({ code, iv, encryptedData });
  };

  const loggedIn = () => !!token.value;

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
    login,
    mpLogin,
    oaLogin,
    appLogin,
    getWxUser,
    getToken,
    getOpenId,
    logout,
    getUserProfileAndLogin,
    loggedIn,
    navigateTo,
  };
};
