import { Component, Vue } from "vue-property-decorator";

@Component
export default class MpMixin extends Vue {
  async mpLogin(cb) {
    const { authSetting } = await this.$wx.getSetting();

    if (!authSetting["scope.userInfo"]) {
      this.$wx.navigateBack();
    } else {
      const { code } = await this.$wx.login();
      const { iv, encryptedData } = await this.$wx.getUserInfo({
        withCredentials: true
      });
      const {
        data: { wxUser, token, extra = {} }
      } = await this.$store.dispatch("public/wxUsers/postAction", {
        showLoading: true,
        action: "login",
        body: { type: "Mp", code, iv, encryptedData }
      });

      cb({ wxUser, token, extra });
    }
  }
}
