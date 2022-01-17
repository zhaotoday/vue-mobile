import wx from "wx-bridge";
import { computed } from "@vue/composition-api";
import { store } from "@/store";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import { useHelpers } from "./use-helpers";

export const useUsers = () => {
  const { useState, useActions } = createNamespacedHelpers(store, "users");
  const { user, userInfo, token } = useState(["user", "userInfo", "token"]);
  const { wxMpLogin, accountRegister, accountLogin, getUserInfo, logout } =
    useActions([
      "wxMpLogin",
      "accountRegister",
      "accountLogin",
      "getUserInfo",
      "logout",
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
    user,
    userInfo,
    token,
    name,
    avatarUrl,
    wxMpLogin,
    accountRegister,
    accountLogin,
    getUserInfo,
    logout,
    loggedIn,
    navigateTo,
  };
};
