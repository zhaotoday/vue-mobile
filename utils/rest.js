import REST from "jt-rest";
import wxb from "./wxb";
import auth from "./auth";
import consts from "@/utils/consts";

export default class extends REST {
  request(
    method = "GET",
    { id, query = {}, body = {}, showLoading = false, showError = true }
  ) {
    if (auth.loggedIn()) {
      const userId = auth.get()["user"]["id"];

      query.wxUserId = userId;
      body.wxUserId = userId;
    }

    if (query.where) {
      query.where = JSON.stringify(query.where);
    }

    if (query.include) {
      query.include = JSON.stringify(query.include);
    }

    if (method === "GET") {
      query._ = new Date().getTime();
    }

    showLoading && wxb.showLoading();

    return new Promise(resolve => {
      super
        .request(method, { id, query, body })
        .then(res => {
          showLoading && wxb.hideLoading();
          resolve(res.data);
        })
        .catch(res => {
          showLoading && wxb.hideLoading();

          if (res.statusCode === 500) {
            showError && wxb.showToast({ title: "服务器出错" });
          } else if (res.statusCode === 401) {
            wxb.navigateTo({ url: consts.LOGIN_PAGE });
          } else {
            showError && wxb.showToast({ title: res.data.error.message });
          }
        });
    });
  }
}
