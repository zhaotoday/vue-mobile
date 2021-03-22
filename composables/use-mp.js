import wx from "wx-bridge";

export const useMp = () => {
  const getUserInfo = async () => {
    return new Promise(async (resolve, reject) => {
      const { authSetting } = await wx.getSetting();

      if (!authSetting["scope.userInfo"]) {
        reject();
      } else {
        const { code } = await wx.login();
        const { iv, encryptedData } = await wx.getUserInfo({
          withCredentials: true
        });
        resolve({ code, iv, encryptedData });
      }
    });
  };

  return {
    getUserInfo
  };
};
