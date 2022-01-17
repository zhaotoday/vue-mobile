import jweixin from "jweixin-module";
import qs from "query-string";
import { PublicWxUsersApi } from "../apis/public/wx-users";
import { ApisApi } from "../apis/wx/apis";

const { _, code } = qs.parse(window.location.search);
const page = window.location.hash.substr(1);

export const useWxOa = () => {
  const login = async (query) => {
    const { wxUser, token } = await PublicWxUsersApi.post({
      action: "login",
      body: { type: "Oa", _, code, page, query },
    });

    return { wxUser, token };
  };

  const configWxJsSdk = async (apiList = []) => {
    const res = await ApisApi.addPath("jsSdkConfig").post({
      body: { url: location.href.split("#")[0] },
    });
    jweixin.config({ ...res, jsApiList: apiList });
  };

  return {
    login,
    configWxJsSdk,
  };
};
