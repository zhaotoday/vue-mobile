import wx from "wx-bridge";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import { store } from "@/store";
import { ref } from "@vue/composition-api";
import { onShow } from "uni-composition-api";

export const useUser = () => {
  const { useState, useActions } = createNamespacedHelpers(store, "users");
  const { user, userInfo, token } = useState(["user", "userInfo", "token"]);
  const { wxMpLogin, accountRegister, accountLogin, getUserInfo } = useActions([
    "wxMpLogin",
    "accountRegister",
    "accountLogin",
    "getUserInfo",
  ]);
  const code = ref("");

  onShow(async () => {
    code.value = (await wx.login())["code"];
  });

  const getWxMpUserProfileAndLogin = async () => {
    const { iv, encryptedData } = await wx.getUserProfile({
      desc: "完善用户资料",
    });
    return wxMpLogin({ code: code.value, iv, encryptedData });
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

  const getRequestHeaders = () => ({
    Authorization: token.value,
  });

  return {
    getWxMpUserProfileAndLogin,
    user,
    userInfo,
    token,
    code,
    accountLogin,
    accountRegister,
    getUserInfo,
    loggedIn,
    navigateTo,
    getRequestHeaders,
  };
};
