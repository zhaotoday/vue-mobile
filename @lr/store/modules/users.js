import helpers from "jt-helpers";
import { publicusersApi } from "../../apis/public/users";
import { usersApi } from "../../apis/client/users";

const state = {
  user: {},
  token: "",
  userInfo: {},
};

const types = helpers.keyMirror({
  SetUser: null,
  SetToken: null,
  SetUserInfo: null,
});

const mutations = {
  [types.SetUser](state, user) {
    state.user = user;
  },
  [types.SetToken](state, token) {
    state.token = token;
  },
  [types.SetUserInfo](state, userInfo) {
    state.userInfo = userInfo;
  },
};

const actions = {
  async wxMpLogin({ commit }, { code, iv, encryptedData }) {
    const { user, token } = await publicusersApi.post({
      showLoading: true,
      action: "wxMpLogin",
      body: { code, iv, encryptedData },
    });
    commit(types.SetUser, user);
    commit(types.SetToken, `Bearer ${token}`);
    return { user, token };
  },
  async accountRegister(
    { commit },
    { nickName, phoneNumber, captcha, password }
  ) {
    const { user, token } = await publicusersApi.post({
      showLoading: true,
      action: "accountRegister",
      body: { nickName, phoneNumber, captcha, password },
    });
    commit(types.SetUser, user);
    commit(types.SetToken, `Bearer ${token}`);
    return { user, token };
  },
  async accountLogin({ commit }, { account, password }) {
    const { user, token } = await publicusersApi.post({
      showLoading: true,
      action: "accountLogin",
      body: { account, password },
    });
    commit(types.SetUser, user);
    commit(types.SetToken, `Bearer ${token}`);
    return { user, token };
  },
  async getUserInfo({ commit }) {
    const res = await usersApi.post({
      action: "getUserInfo",
    });
    commit(types.SetUserInfo, res);
    return res;
  },
  logout({ commit }) {
    commit(types.SetUser, {});
    commit(types.SetToken, "");
    commit(types.SetUserInfo, {});
    return {};
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
