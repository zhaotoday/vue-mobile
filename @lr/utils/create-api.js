import { to } from "jt-helpers";
import { useConsts } from "@/composables/use-consts";

const { ApiUrl, LoginUrl } = useConsts();

const formatWhere = (obj) => {
  const ret = {};

  Object.keys(obj).forEach((attribute) => {
    ret[attribute] = {};

    Object.keys(obj[attribute]).forEach((operator) => {
      if (operator.substring(0, 2) === "$$") {
        ret[attribute] = {
          [operator.replace("$$", "$")]: obj[attribute][operator],
        };
      } else if (
        obj[attribute][operator] === undefined ||
        obj[attribute][operator] === "" ||
        obj[attribute][operator] === null
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
  showLoading = false,
  showError = true,
}) => {
  if (query && query.where) {
    query.where = formatWhere(query.where);
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

  showLoading && uni.showLoading();

  const [error, res] = await to(
    uni.request({
      method: method.toUpperCase(),
      url: `${baseUrl}${query ? url + toQueryString(query) : url}`,
      header: headers,
      dataType: "json",
      data: body,
    })
  );

  showLoading && uni.hideLoading();

  const serverError = { message: "服务器错误" };
  const unauthorizedError = { message: "没有权限" };

  if (res) {
    if ((res.statusCode + "").charAt(0) === "2") {
      return res.data.data;
    } else {
      if (res.statusCode === 500) {
        showError && uni.showToast({ title: serverError.message });
        return Promise.reject(serverError);
      } else if (res.statusCode === 401) {
        uni.navigateTo({ url: LoginUrl || "/pages/user/mp-login/index" });
        return Promise.reject(unauthorizedError);
      } else {
        showError &&
          uni.showToast({
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
    showError && uni.showToast({ title: serverError.message });
    return Promise.reject(error || serverError);
  }
};

export const createApi = ({
  baseUrl = ApiUrl,
  url,
  headers = () => ({}),
  query = () => ({}),
  body = () => ({}),
}) => {
  const getHeaders = headers;
  const getQuery = query;
  const getBody = body;

  return {
    get: ({ headers, joinUrl = "", id, query, showLoading, showError } = {}) =>
      request({
        method: "get",
        baseUrl,
        url: `${url}${joinUrl}${id ? `/${id}` : ""}`,
        headers: { ...getHeaders(), ...headers },
        query: { ...getQuery(), ...query },
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
    } = {}) =>
      request({
        method: "post",
        baseUrl,
        url: action
          ? `${url}${joinUrl}${id ? `/${id}` : ""}/actions/${action}`
          : url + joinUrl + (id ? `/${id}` : ""),
        headers: { ...getHeaders(), ...headers },
        query: { ...getQuery(), ...query },
        body: { ...getBody(), ...body },
        showLoading,
        showError,
      }),

    put: ({
      headers,
      joinUrl = "",
      id,
      body,
      query,
      showLoading,
      showError,
    } = {}) =>
      request({
        method: "put",
        baseUrl,
        url: `${url}${joinUrl}/${id}`,
        headers: { ...getHeaders(), ...headers },
        query: { ...getQuery(), ...query },
        body: { ...getBody(), ...body },
        showLoading,
        showError,
      }),

    delete: ({
      headers,
      joinUrl = "",
      id,
      query,
      showLoading,
      showError,
    } = {}) =>
      request({
        method: "delete",
        baseUrl,
        url: `${url}${joinUrl}/${id}`,
        headers: { ...getHeaders(), ...headers },
        query: { ...getQuery(), ...query },
        showLoading,
        showError,
      }),
  };
};
