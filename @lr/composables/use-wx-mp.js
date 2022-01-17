import wx from "wx-bridge";

export const useWxMp = () => {
  const getUserProfileAndLogin = async () => {
    const { iv, encryptedData } = await wx.getUserProfile({
      desc: "完善用户资料",
    });
    const { code } = await wx.login();
    return { code, iv, encryptedData };
  };

  return {
    getUserProfileAndLogin,
  };
};
