import wx from "wx-bridge";
import { useConsts } from "@/composables/use-consts";
import { to } from "jt-helpers";

const createRequest = ({ baseUrl, timeout = 5000, headers, query }) => {
  const request = axios.create({
    baseURL: baseUrl || process.env.VUE_APP_API_URL,
    timeout,
  });

  request.interceptors.request.use(
    (config) => {
      const { method, params, showLoading } = config;

      showLoading && NProgress.start();

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

      return config;
    },
    (error) => Promise.reject(error)
  );

  request.interceptors.response.use(
    (response) => {
      const {
        config,
        data: { data },
      } = response;

      config.showLoading && NProgress.done();

      return data;
    },
    (error) => {
      const {
        response: { config, status, data },
      } = error;

      config.showLoading && NProgress.done();

      if (status === 401) {
        window.location.href = "/#/logout";
      } else {
        config.showError && ElMessage.error(data.error || "服务器内部错误");
      }

      return Promise.reject(error);
    }
  );

  return request;
};

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

const request = async ({
  baseUrl,
  url,
  method,
  headers,
  joinUrl = "",
  id,
  query,
  body,
  showLoading = true,
  showError = true,
}) => {
  const [error, res] = await to(
    wx.request({
      url: useConsts().ApiUrl + url,
      header: headers,
      method,
      dataType: "json",
      data: body,
    })
  );

  if (res) {
    if ((res.statusCode + "").charAt(0) === "2") {
      resolve(res);
    } else {
      showLoading && wx.hideLoading();

      if (res.statusCode === 500) {
        showError && wx.showToast({ title: "服务器出错" });
      } else if (res.statusCode === 401) {
        wx.navigateTo({ url: "/pages/login/index" });
      } else {
        if (showError) {
          if (res.data && res.data.error) {
            wx.showToast({ title: res.data.error.message });
          } else {
            wx.showToast({ title: "服务器出错" });
          }
        }
      }
    }
  } else if (error) {
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
