import { computed } from "@vue/composition-api";
import { store } from "@/store";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import { useHelpers } from "@/composables/use-helpers";
import { usersApi } from "../apis/client/users";

export const useUsers = () => {
  const { useState, useActions } = createNamespacedHelpers(store, "users");
  const { user, token } = useState(["user", "token"]);
  const { wxMpLogin, accountRegister, accountLogin, setUser, setToken, logout } =
    useActions([
      "wxMpLogin",
      "accountRegister",
      "accountLogin",
      "setUser",
      "setToken",
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
      wxMpOpenId,
      wxOaOpenId,
      wxAppOpenId,
      wxWebOpenId,
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
      wxMpOpenId,
      wxOaOpenId,
      wxAppOpenId,
      wxWebOpenId,
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

  const getHeaders = () => {
    return loggedIn() ? { Authorization: `Bearer ${token.value}` } : undefined;
  };

  const loggedIn = () => !!token.value;

  return {
    user,
    token,
    name,
    avatarUrl,
    wxMpLogin,
    accountRegister,
    accountLogin,
    setUser,
    setToken,
    logout,
    getUserInfo,
    getHeaders,
    loggedIn,
  };
};
