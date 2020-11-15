import wxb from "wx-bridge";

const OpenId = "openId";
const User = "user";
const Token = "token";

// #ifdef H5
const { openId, user, token } = require("@/mock-user.json");
// #endif

// #ifndef H5
const openId = "";
const user = {};
const token = "";
// #endif

export default {
  login() {
    wxb.setStorageSync(User, user);
    wxb.setStorageSync(Token, `Bearer ${token}`);

    return { user, token };
  },
  setOpenId() {
    wxb.setStorageSync(OpenId, openId);
  }
};
