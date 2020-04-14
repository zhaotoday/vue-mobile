import REST from "jt-rest";
import wxb from "./wxb";
import auth from "./auth";
import consts from "@/utils/consts";

export default class extends REST {
  _toString(obj) {
    let ret = {};
    let types = [];

    Object.keys(obj).forEach(v => {
      ret[v] = {};
      types = Object.keys(obj[v]);

      types.forEach(type => {
        if (obj[v][type] === undefined || obj[v][type] === "") {
          delete ret[v];
        } else if (type === "$like") {
          ret[v][type] = `%${obj[v][type]}%`;
        } else {
          ret[v] = obj[v];
        }
      });
    });

    return JSON.stringify(ret);
  }

  request(
    method = "GET",
    { id, query = {}, body = {}, showLoading = false, showError = true }
  ) {
    if (query.where) {
      query.where = this._toString(query.where);
    }

    if (query.include) {
      query.include = JSON.stringify(query.include);
    }

    if (query.order) {
      query.order = JSON.stringify(query.order);
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
            wxb.navigateTo({ url: consts.LoginPage });
          } else {
            if (showError) {
              if (res.data && res.data.error) {
                wxb.showToast({ title: res.data.error.message });
              } else {
                wxb.showToast({ title: "服务器出错" });
              }
            }
          }
        });
    });
  }
}
