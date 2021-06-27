import { createNamespacedHelpers } from "vuex-composition-helpers";
import { store } from "@/store";
import { useMp } from "../../composables/use-mp";

export const useWxUser = () => {
  const { useState, useActions } = createNamespacedHelpers(store, "wxUsers");
  const { getUserInfo } = useMp();

  const { wxUser, token, openId } = useState(["wxUser", "token", "openId"]);

  const actions = useActions(["login", "getWxUser", "getToken", "getOpenId"]);

  const login = async () => {
    const { code, iv, encryptedData } = await getUserInfo();
    return actions.login({ code, iv, encryptedData });
  };
  const loggedIn = () => {
    return !!token.value;
  };
  const getWxUser = () => actions.getWxUser();
  const getToken = () => actions.getToken();
  const getOpenId = () => actions.getOpenId();

  return {
    wxUser,
    token,
    openId,
    login,
    loggedIn,
    getWxUser,
    getToken,
    getOpenId,
  };
};
