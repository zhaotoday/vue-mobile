import { Component, Vue } from "vue-property-decorator";

@Component
export default class WxUserMixin extends Vue {
  async getWxUserOpenId() {
    const { code } = await this.$wx.login({
      withCredentials: true
    });

    const {
      data: { openId }
    } = await this.$store.dispatch("public/wxUsers/postAction", {
      showError: false,
      action: "getOpenId",
      body: { code }
    });

    return openId;
  }

  async getWxUserInfo() {
    const {
      data: {
        nickName,
        avatarUrl,
        avatarId,
        phoneNumber,
        name = "",
        extra = {}
      }
    } = await this.$store.dispatch("wx/wxUsers/postAction", {
      showError: false,
      action: "getUserInfo"
    });

    return {
      nickName,
      avatarUrl,
      avatarId,
      phoneNumber,
      name,
      extra
    };
  }
}
