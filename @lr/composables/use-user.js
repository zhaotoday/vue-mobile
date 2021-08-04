import wx from "wx-bridge";
import { computed } from "@vue/composition-api";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import { useHelpers } from "./use-helpers";
import { store } from "@/store";

export const useUser = () => {
  const { useState, useActions } = createNamespacedHelpers(store, "users");
  const { user, userInfo, token } = useState(["user", "userInfo", "token"]);
  const { wxMpLogin, accountRegister, accountLogin, getUserInfo } = useActions([
    "wxMpLogin",
    "accountRegister",
    "accountLogin",
    "getUserInfo",
  ]);

  const name = computed(() => {
    const { name, nickName, wxNickName, qqNickName } = userInfo.value;

    return name || nickName || wxNickName || qqNickName;
  });

  const avatarUrl = computed(() => {
    const { wxAvatarUrl, qqAvatarUrl, avatarFileId } = userInfo.value;

    if (avatarFileId) {
      return useHelpers().getImageUrl({ id: avatarFileId });
    } else {
      return wxAvatarUrl || qqAvatarUrl || "";
    }
  });

  const getWxMpUserProfileAndLogin = async (code) => {
    const { iv, encryptedData } = await wx.getUserProfile({
      desc: "完善用户资料",
    });
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

  const getRequestHeaders = () => ({
    Authorization: token.value,
  });

  return {
    getWxMpUserProfileAndLogin,
    user,
    userInfo,
    token,
    name,
    avatarUrl,
    accountLogin,
    accountRegister,
    getUserInfo,
    loggedIn,
    navigateTo,
    getRequestHeaders,
  };
};
