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
  baseQuery = {},
  query,
  body,
  showLoading = true,
  showError = true,
}) => {
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

  showLoading && wx.showLoading();

  const [error, res] = await to(
    wx.request({
      method: method.toUpperCase(),
      url: `${baseUrl}${query ? url + toQueryString(query) : url}`,
      header: headers,
      dataType: "json",
      data: body,
    })
  );

  showLoading && wx.hideLoading();

  const defaultError = { message: "服务器错误" };
  const unauthedError = { message: "没有权限" };

  if (res) {
    if ((res.statusCode + "").charAt(0) === "2") {
      return res.data.data;
    } else {
      if (res.statusCode === 500) {
        showError && wx.showToast({ title: defaultError.message });
        return Promise.reject(defaultError);
      } else if (res.statusCode === 401) {
        wx.navigateTo({ url: "/pages/login/index" });
        return Promise.reject(unauthedError);
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
  } else {
    showError && wx.showToast({ title: defaultError.message });
    return Promise.reject(error || defaultError);
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
