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
  baseQuery,
  query,
  body,
  showLoading = true,
  showError = true,
}) => {
  showLoading && wx.showLoading();

  if (query) {
    query.where = formatQuery(
      query.where
        ? {
            ...baseQuery.where,
            ...query.where,
          }
        : baseQuery.where
    );
  }

  ["include", "order", "attributes"].forEach((key) => {
    if (query && query[key]) {
      query[key] = JSON.stringify(query[key]);
    }
  });

  if (method === "get") {
    if (query) {
      query._ = new Date().getTime();
    } else {
      query = { _: new Date().getTime() };
    }
  }

  const [error, res] = await to(
    wx.request({
      method: method.toUpperCase(),
      url: `${baseUrl}${url}`,
      header: headers,
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

export const createApi = ({ baseUrl, headers, url, baseQuery = {} }) => {
  return {
    config: { baseUrl, headers, url, baseQuery },

    get: ({ joinUrl = "", id, query, showLoading = true, showError = true }) =>
      request({
        method: "get",
        baseUrl,
        headers,
        url: `${url}${joinUrl}${id ? `/${id}` : ""}`,
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
      request({
        method: "post",
        baseUrl,
        headers,
        url: action ? `${url}${joinUrl}/actions/${action}` : url + joinUrl,
        body,
        query,
        showLoading,
        showError,
      }),

    put: ({
      joinUrl = "",
      id,
      body,
      query,
      showLoading = true,
      showError = true,
    }) =>
      request({
        method: "put",
        baseUrl,
        headers,
        url: `${url}${joinUrl}/${id}`,
        query,
        body,
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
      request({
        method: "delete",
        url: `${url}${joinUrl}/${id}`,
        query,
        showLoading,
        showError,
      }),
  };
};
