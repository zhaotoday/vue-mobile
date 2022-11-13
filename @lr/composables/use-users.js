import { computed } from "@vue/composition-api";
import { store } from "@/store";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import { useHelpers } from "@/composables/use-helpers";
import { useConsts } from "@/composables/use-consts";
import { usersApi } from "../apis/client/users";

export const useUsers = () => {
  const { useState, useActions } = createNamespacedHelpers(store, "users");
  const { user, token } = useState(["user", "token"]);
  const { wxLogin, accountRegister, accountLogin, setUser, setToken, logout } =
    useActions([
      "wxLogin",
      "accountRegister",
      "accountLogin",
      "setUser",
      "setToken",
      "logout",
    ]);

  const getUserInfo = async ({ headers } = {}) => {
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
    } = await usersApi.post({ headers, action: "getUserInfo" });

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

  const loggedIn = () => !!token.value;

  return {
    user,
    token,
    name,
    avatarUrl,
    wxLogin,
    accountRegister,
    accountLogin,
    setUser,
    setToken,
    logout,
    getUserInfo,
    loggedIn,
  };
};
