import wx from "wx-bridge";
import { to } from "jt-helpers";

const formatQuery = (obj) => {
  const ret = {};

  Object.keys(obj).forEach((attribute) => {
    ret[attribute] = {};

    Object.keys(obj[attribute]).forEach((operator) => {
      if (
        obj[attribute][operator] === undefined ||
        obj[attribute][operator] === ""
      ) {
        delete ret[attribute];
      } else if (operator === "$like") {
        ret[attribute][operator] = `%${obj[attribute][operator]}%`;
      } else {
        ret[attribute] = obj[attribute];
      }
    });
  });

  return JSON.stringify(ret);
};

const toQueryString = (query) => {
  if (!query || !Object.keys(query).length) {
    return "";
  }

  return (
    "?" +
    Object.keys(query)
      .map((key) => `${key}=${encodeURIComponent(query[key])}`)
      .join("&")
  );
};

const request = async ({
  baseUrl,
  url,
  method,
  headers,
  query,
  body,
  showLoading = true,
  showError = true,
}) => {
  showLoading && wx.showLoading();

  if (headers) {
    config.headers = headers;
  }

  if (params) {
    if (params.where) {
      config.params.where = formatQuery({
        ...params.where,
        ...(query.where || {}),
      });
    } else {
      config.params.where = formatQuery(query.where || {});
    }
  }

  ["include", "order", "attributes"].forEach((key) => {
    if (params && params[key]) {
      config.params[key] = JSON.stringify(params[key]);
    }
  });

  if (method === "get") {
    if (params) {
      config.params._ = new Date().getTime();
    } else {
      config.params = { _: new Date().getTime() };
    }
  }

  const [error, res] = await to(
    wx.request({
      url: `${baseUrl}${query ? url + toQueryString(query) : url}`,
      header: headers,
      method,
      dataType: "json",
      data: body,
    })
  );

  if (res) {
    if ((res.statusCode + "").charAt(0) === "2") {
      return res.data.data;
    } else {
      showLoading && wx.hideLoading();

      if (res.statusCode === 500) {
        showError && wx.showToast({ title: "服务器出错" });
      } else if (res.statusCode === 401) {
        wx.navigateTo({ url: "/pages/login/index" });
      } else {
        showError &&
          wx.showToast({
            title:
              res.data && res.data.error
                ? res.data.error.message
                : "服务器出错",
          });
        return Promise.reject(res.data && res.data.error ? res.data.error : {});
      }
    }
  } else if (error) {
    showError && wx.showToast({ title: "服务器出错" });
    return Promise.reject(error);
  }
};

export const createApi = ({ baseUrl, headers, url, query = {} }) => {
  const request = createRequest({ baseUrl, headers, query });

  return {
    config: { baseUrl, headers, url, query },

    get: ({ joinUrl = "", id, query, showLoading = true, showError = true }) =>
      request.get(`${url}${joinUrl}${id ? `/${id}` : ""}`, {
        params: query,
        showLoading,
        showError,
      }),

    post: ({
      joinUrl = "",
      action,
      body,
      query,
      showLoading = true,
      showError = true,
    }) =>
      request.post(
        action ? `${url}${joinUrl}/actions/${action}` : url + joinUrl,
        body,
        {
          params: query,
          showLoading,
          showError,
        }
      ),

    put: ({
      joinUrl = "",
      id,
      body,
      query,
      showLoading = true,
      showError = true,
    }) =>
      request.put(`${url}${joinUrl}/${id}`, body, {
        params: query,
        showLoading,
        showError,
      }),

    delete: ({
      joinUrl = "",
      id,
      query,
      showLoading = true,
      showError = true,
    }) =>
      request.delete(`${url}${joinUrl}/${id}`, {
        params: query,
        showLoading,
        showError,
      }),
  };
};
