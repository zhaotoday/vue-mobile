import wx from "wx-bridge";

export const useWxMp = () => {
  const state = {
    loginTimer: null,
    loginCode: "",
  };

  const getUserProfileAndLogin = async () => {
    const { iv, encryptedData } = await wx.getUserProfile({
      desc: "完善用户资料",
    });

    return { code: state.code, iv, encryptedData };
  };

  const getLoginCode = async () => {
    const { code } = await wx.login();
    state.code = code;
  };

  const onRefreshLoginCode = async () => {
    await getLoginCode();

    state.loginTimer = setInterval(async () => {
      await getLoginCode();
    }, 5 * 60 * 1000);
  };

  const offRefreshLoginCode = () => {
    clearInterval(state.loginCode);
  };

  return {
    getUserProfileAndLogin,
    onRefreshLoginCode,
    offRefreshLoginCode,
  };
};
