import wx from "wx-bridge";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import { store } from "@/store";

export const useUser = () => {
  const { useState, useActions } = createNamespacedHelpers(store, "users");
  const { user, token } = useState(["user", "token"]);
  const { wxMpLogin, accountRegister, accountLogin, getUser } = useActions([
    "wxMpLogin",
    "accountRegister",
    "accountLogin",
    "getUser",
  ]);

  const getWxMpUserProfileAndLogin = async () => {
    const { iv, encryptedData } = await wx.getUserProfile({
      desc: "完善用户资料",
    });
    const { code } = await wx.login();
    return wxMpLogin({ code, iv, encryptedData });
  };

  const loggedIn = () => !!token.value;

  const navigateTo = ({
    requiresLogin = false,
    loginUrl = "/pages/user/mp-login/index",
    url,
  }) => {
    wx.navigateTo({
      url: requiresLogin && !loggedIn() ? loginUrl : url,
    });
  };

  return {
    getWxMpUserProfileAndLogin,
    user,
    token,
    accountLogin,
    accountRegister,
    getUser,
    loggedIn,
    navigateTo,
  };
};
