import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import jweixin from "jweixin-module";
import qs from "query-string";

const { code } = qs.parse(window.location.search);

@Component
export default class OaMixin extends Vue {
  async oaLogin(query = {}, cb) {
    const {
      data: { wxUser, token }
    } = await this.$store.dispatch("public/wxUsers/postAction", {
      action: "login",
      body: { type: "Oa", code, ...query }
    });

    cb({ wxUser, token });
  }

  async configWxJsSdk(apiList = []) {
    const {
      data: { data }
    } = await axios({
      url: `${this.$consts.ApiUrl}/wx/apis/jsSdkConfig`,
      method: "POST",
      data: { url: location.href.split("#")[0] }
    });

    jweixin.config({ ...data, jsApiList: apiList });
  }
}
