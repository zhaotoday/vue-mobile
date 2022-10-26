export const useWxMp = () => {
  const state = {
    loginTimer: null,
    loginCode: "",
  };

  const getUserProfileAndLogin = async () => {
    const { iv, encryptedData } = await uni.getUserProfile({
      desc: "完善用户资料",
    });

    return { code: state.loginCode, iv, encryptedData };
  };

  const getLoginCode = async () => {
    const { code } = await uni.login();
    state.loginCode = code;
  };

  const onRefreshLoginCode = async () => {
    await getLoginCode();

    state.loginTimer = setInterval(async () => {
      await getLoginCode();
    }, 4 * 60 * 1000);
  };

  const offRefreshLoginCode = () => {
    clearInterval(state.loginTimer);
  };

  return {
    getUserProfileAndLogin,
    onRefreshLoginCode,
    offRefreshLoginCode,
  };
};
