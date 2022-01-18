import wx from "wx-bridge";
import { computed } from "@vue/composition-api";
import { store } from "@/store";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import { useHelpers } from "./use-helpers";

export const useUsers = () => {
  const { useState, useActions } = createNamespacedHelpers(store, "users");
  const { user, token } = useState(["user", "token"]);
  const { wxMpLogin, accountRegister, accountLogin, logout } = useActions([
    "wxMpLogin",
    "accountRegister",
    "accountLogin",
    "logout",
  ]);

  const name = computed(() => {
    const { name, nickName, wxNickName } = user.value;

    return name || nickName || wxNickName;
  });

  const avatarUrl = computed(() => {
    const { wxAvatarUrl, avatarFileId } = user.value;

    if (avatarFileId) {
      return useHelpers().getImageUrl({ id: avatarFileId });
    } else {
      return wxAvatarUrl || "";
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
