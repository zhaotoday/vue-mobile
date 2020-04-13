import { Component, Vue } from "vue-property-decorator";

@Component
export default class MpMixin extends Vue {
  async mpLogin() {
    const getSettingRes = await this.$wx.getSetting();

    if (!getSettingRes.authSetting["scope.userInfo"]) {
      this.$wx.navigateBack();
    } else {
      const { code } = await this.$wx.login();
      const { iv, encryptedData } = await this.$wx.getUserInfo({
        withCredentials: true
      });
      const {
        data: { wxUser, token }
      } = await this.$store.dispatch("public/wxUsers/postAction", {
        showLoading: true,
        action: "login",
        body: { type: "Mp", code, iv, encryptedData }
      });

      return { wxUser, token };
    }
  }
}
