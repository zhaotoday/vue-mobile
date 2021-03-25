import wxb from "wx-bridge";

const OpenId = "openId";
const Token = "token";
const Code = "code";
const Version = "version";

export default {
  get() {
    return {
      [OpenId]: wxb.getStorageSync(OpenId),
      [Token]: wxb.getStorageSync(Token)
    };
  },
  login({ token, code, version = "" }) {
    wxb.setStorageSync(Token, `Bearer ${token}`);

    if (code) {
      wxb.setStorageSync(Code, code);
    }

    if (version) {
      wxb.setStorageSync(Version, version);
    }
  },
  logout() {
    wxb.removeStorageSync(Token);
    wxb.removeStorageSync(Code);
    wxb.removeStorageSync(Version);
  },
  setOpenId(value) {
    wxb.setStorageSync(OpenId, value);
  },
  getOpenId() {
    return wxb.getStorageSync(OpenId);
  },
  loggedIn({ code, version = "" } = {}) {
    return (
      !!wxb.getStorageSync(Token) &&
      (!code || wxb.getStorageSync(Code) === code) &&
      (!version || wxb.getStorageSync(Version) === version)
    );
  },
  getHeaders() {
    return { Authorization: this.get()[Token] };
  }
};
