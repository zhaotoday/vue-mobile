import wx from "../wxb";
import $permission from "./utils/permission";

export const permission = {
  request(code) {
    return $permission.requestAndroidPermission(`android.permission.${code}`);
  },
  async check(code, tip) {
    const res = await this.request(code);

    return new Promise(async (resolve, reject) => {
      if (res === 1) {
        resolve();
      } else if (res === -1) {
        const { confirm } = await wx.showModal({
          title: "提示",
          content: tip
        });

        if (confirm) {
          this.gotoAppSetting();
        } else {
          reject();
        }
      }
    });
  },
  gotoAppSetting() {
    $permission.gotoAppPermissionSetting();
  }
};
