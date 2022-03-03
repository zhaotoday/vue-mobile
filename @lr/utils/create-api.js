import wx from "wx-bridge";
import { to } from "jt-helpers";
import { useConsts } from "@/composables/use-consts";

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
  showLoading = false,
  showError = true,
}) => {
  if (query) {
    query.where = formatQuery(
      query.where
        ? {
            ...baseQuery.where,
            ...query.where,
          }
        : baseQuery.where || {}
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

  const serverError = { message: "服务器错误" };
  const unauthorizedError = { message: "没有权限" };

  if (res) {
    if ((res.statusCode + "").charAt(0) === "2") {
      return res.data.data;
    } else {
      if (res.statusCode === 500) {
        showError && wx.showToast({ title: serverError.message });
        return Promise.reject(serverError);
      } else if (res.statusCode === 401) {
        wx.navigateTo({ url: "/pages/user/mp-login/index" });
        return Promise.reject(unauthorizedError);
      } else {
        showError &&
          wx.showToast({
            title:
              res.data && res.data.error
                ? res.data.error.message
                : serverError.message,
          });
        return Promise.reject(
          res.data && res.data.error ? res.data.error : serverError
        );
      }
    }
  } else {
    showError && wx.showToast({ title: serverError.message });
    return Promise.reject(error || serverError);
  }
};

export const createApi = ({
  baseUrl = useConsts().ApiUrl,
  getHeaders,
  url,
  baseQuery = {},
}) => {
  return {
    config: () => ({
      baseUrl,
      headers: getHeaders ? getHeaders() : undefined,
      url,
      baseQuery,
    }),

    get: ({ headers, joinUrl = "", id, query, showLoading, showError }) =>
      request({
        method: "get",
        baseUrl,
        headers: headers || (getHeaders ? getHeaders() : undefined),
        baseQuery,
        url: `${url}${joinUrl}${id ? `/${id}` : ""}`,
        query,
        showLoading,
        showError,
      }),

    post: ({
      headers,
      joinUrl = "",
      id,
      action,
      body,
      query,
      showLoading,
      showError,
    }) =>
      request({
        method: "post",
        baseUrl,
        headers: headers || (getHeaders ? getHeaders() : undefined),
        baseQuery,
        url: action
          ? `${url}${joinUrl}${id ? `/${id}` : ""}/actions/${action}`
          : url + joinUrl + (id ? `/${id}` : ""),
        query,
        body,
        showLoading,
        showError,
      }),

    put: ({ headers, joinUrl = "", id, body, query, showLoading, showError }) =>
      request({
        method: "put",
        baseUrl,
        headers: headers || (getHeaders ? getHeaders() : undefined),
        baseQuery,
        url: `${url}${joinUrl}/${id}`,
        query,
        body,
        showLoading,
        showError,
      }),

    delete: ({ headers, joinUrl = "", id, query, showLoading, showError }) =>
      request({
        method: "delete",
        baseUrl,
        headers: headers || (getHeaders ? getHeaders() : undefined),
        baseQuery,
        url: `${url}${joinUrl}/${id}`,
        query,
        showLoading,
        showError,
      }),
  };
};
