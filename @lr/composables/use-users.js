import wx from "wx-bridge";
import { computed } from "@vue/composition-api";
import { store } from "@/store";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import { useHelpers } from "./use-helpers";
import { usersApi } from "../apis/client/users";

export const useUsers = () => {
  const { useState, useActions } = createNamespacedHelpers(store, "users");
  const { user, token } = useState(["user", "token"]);
  const { wxLogin, accountRegister, accountLogin, setUser, logout } =
    useActions([
      "wxLogin",
      "accountRegister",
      "accountLogin",
      "setUser",
      "logout",
    ]);

  const getUserInfo = async () => {
    const {
      id,
      name,
      nickName,
      avatarFileId,
      phoneNumber,
      wxNickName,
      wxAvatarUrl,
      ...rest
    } = await usersApi.post({ action: "getUserInfo" });

    const user = {
      id,
      name,
      nickName,
      avatarFileId,
      phoneNumber,
      wxNickName,
      wxAvatarUrl,
    };

    setUser({ user });

    return { ...user, ...rest };
  };

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
    token,
    name,
    avatarUrl,
    wxLogin,
    accountRegister,
    accountLogin,
    logout,
    getUserInfo,
    loggedIn,
    navigateTo,
  };
};
