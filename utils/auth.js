import wxb from "wx-bridge";

const OPEN_ID = "openId";
const USER = "user";
const TOKEN = "token";
const VERSION = "version";

export default {
  get() {
    return {
      [OPEN_ID]: wxb.getStorageSync(OPEN_ID),
      [USER]: wxb.getStorageSync(USER),
      [TOKEN]: wxb.getStorageSync(TOKEN)
    };
  },
  login({ user, token, version = "" }) {
    wxb.setStorageSync(USER, user);
    wxb.setStorageSync(TOKEN, `Bearer ${token}`);
    wxb.setStorageSync(VERSION, version);
  },
  logout() {
    wxb.removeStorageSync(USER);
    wxb.removeStorageSync(TOKEN);
  },
  set(data) {
    const user = this.get()[USER];
    wxb.setStorageSync(USER, { ...user, ...data });
  },
  setOpenId(value) {
    wxb.setStorageSync(OPEN_ID, value);
  },
  getOpenId() {
    return wxb.getStorageSync(OPEN_ID);
  },
  setName({ name }) {
    const user = this.get()[USER];
    wxb.setStorageSync(USER, { ...user, name });
  },
  setPhoneNumber({ phoneNumber }) {
    const user = this.get()[USER];
    wxb.setStorageSync(USER, { ...user, phoneNumber });
  },
  loggedIn(version = "") {
    return (
      (!version || wxb.getStorageSync(VERSION) === version) &&
      !!wxb.getStorageSync(USER) &&
      !!wxb.getStorageSync(TOKEN)
    );
  },
  infoModified() {
    return (
      this.loggedIn() &&
      !!this.get()["user"].name &&
      !!this.get()["user"].phoneNumber
    );
  },
  phoneNumberBound() {
    return this.loggedIn() && !!this.get()["user"].phoneNumber;
  },
  getHeaders() {
    return { Authorization: this.get()["token"] };
  }
};
