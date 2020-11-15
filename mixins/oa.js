import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import jweixin from "jweixin-module";
import qs from "query-string";

const { _, code } = qs.parse(window.location.search);
const page = window.location.hash.substr(1);

@Component
export default class OaMixin extends Vue {
  async oaLogin(query = {}) {
    const {
      data: { wxUser, token, extra = {} }
    } = await this.$store.dispatch("public/wxUsers/postAction", {
      action: "login",
      body: { type: "Oa", _, code, page, query }
    });

    return { wxUser, token, extra };
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
