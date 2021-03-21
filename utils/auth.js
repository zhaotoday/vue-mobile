import wx from "wx-bridge";

const OpenId = "openId";
const Token = "token";
const Code = "code";
const Version = "version";

export default {
  get() {
    return {
      [OpenId]: wx.getStorageSync(OpenId),
      [Token]: wx.getStorageSync(Token)
    };
  },
  login({ token, code, version = "" }) {
    wx.setStorageSync(Token, `Bearer ${token}`);

    if (code) {
      wx.setStorageSync(Code, code);
    }

    if (version) {
      wx.setStorageSync(Version, version);
    }
  },
  logout() {
    wx.removeStorageSync(Token);
    wx.removeStorageSync(Code);
    wx.removeStorageSync(Version);
  },
  setOpenId(value) {
    wx.setStorageSync(OpenId, value);
  },
  getOpenId() {
    return wx.getStorageSync(OpenId);
  },
  loggedIn({ code, version = "" } = {}) {
    return (
      !!wx.getStorageSync(Token) &&
      (!code || wx.getStorageSync(Code) === code) &&
      (!version || wx.getStorageSync(Version) === version)
    );
  },
  getHeaders() {
    return { Authorization: this.get()[Token] };
  }
};
