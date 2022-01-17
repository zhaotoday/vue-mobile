import jweixin from "jweixin-module";
import qs from "query-string";
import { wxApisApi } from "../apis/client/wx-apis";

export const useWxOa = () => {
  const getLoginQuery = async () => {
    const { _, code } = qs.parse(window.location.search);
    const page = window.location.hash.substr(1);

    return { _, code, page };
  };

  const configWxJsSdk = async (apiList = []) => {
    const res = await wxApisApi.post({
      joinUrl: "/jsSdkConfig",
      body: { url: location.href.split("#")[0] },
    });
    jweixin.config({ ...res, jsApiList: apiList });
  };

  return {
    getLoginQuery,
    configWxJsSdk,
  };
};
