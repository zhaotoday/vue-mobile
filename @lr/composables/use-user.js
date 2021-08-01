import wx from "wx-bridge";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import { store } from "@/store";

export const useUser = () => {
  const { useState, useActions } = createNamespacedHelpers(store, "users");
  const { user, token } = useState(["user", "token"]);
  const { wxMpLogin, getUser } = useActions(["wxMpLogin", "getUser"]);

  const getWxMpUserProfileAndLogin = async () => {
    const { iv, encryptedData } = await wx.getUserProfile({
      desc: "完善用户资料",
    });
    const { code } = await wx.login();
    return wxMpLogin({ code, iv, encryptedData });
  };

  return {
    getWxMpUserProfileAndLogin,
    user,
    token,
    getUser,
  };
};
