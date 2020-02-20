import wxb from "wx-bridge";

// #ifdef H5
const { openId, user, token } = require("@/mock-user.json");
// #endif

// #ifndef H5
const openId = "";
const user = {};
const token = "";
// #endif

const OPEN_ID = "openId";
const USER = "user";
const TOKEN = "token";

export default {
  login() {
    wxb.setStorageSync(USER, user);
    wxb.setStorageSync(TOKEN, `Bearer ${token}`);
  },
  setOpenId() {
    wxb.setStorageSync(OPEN_ID, openId);
  }
};
