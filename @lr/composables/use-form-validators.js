export const useFormValidators = () => {
  return {
    userId({ message = "" } = {}) {
      return {
        validator(rule, value) {
          return !value || /^[1-9]\d{7}$/.test(value);
        },
        message: message || "请输入8位数字ID",
      };
    },
    account({ label = "账号", message = "" } = {}) {
      return {
        pattern: /[a-zA-Z0-9_-]{8,20}/,
        message: message || `${label}格式错误`,
      };
    },
    nickName({ label = "昵称", message = "" } = {}) {
      return {
        pattern: /^[\\w\u4e00-\u9fa5]{2,8}$/,
        message: message || `${label}格式错误`,
      };
    },
    required({ label, message } = {}) {
      return {
        required: true,
        message: message || `请输入${label}`,
      };
    },
    phoneNumber({ label = "手机号", message = "" } = {}) {
      return {
        pattern: /^1\d{2}\s?\d{4}\s?\d{4}$/,
        message: message || `${label}格式错误`,
      };
    },
    email({ label = "邮箱", message = "" } = {}) {
      return {
        type: "email",
        message: message || `${label}格式错误`,
      };
    },
    phoneNumberOrEmail({ message = "" } = {}) {
      const phoneNumberPattern = /^1\d{2}\s?\d{4}\s?\d{4}$/;
      const emailPattern =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      return {
        validator(rule, value) {
          return phoneNumberPattern.test(value) || emailPattern.test(value);
        },
        message: message || "请输入手机号或邮箱",
      };
    },
    password({ label = "密码", message = "" } = {}) {
      return {
        pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
        message: message || `${label}格式错误`,
      };
    },
    captcha({ label = "验证码", message = "" } = {}) {
      return {
        len: 6,
        message: message || `${label}格式错误`,
      };
    },
  };
};
