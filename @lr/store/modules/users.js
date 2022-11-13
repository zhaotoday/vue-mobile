import helpers from "jt-helpers";
import { publicUsersApi } from "../../apis/public/users";

const types = helpers.keyMirror({
  SetUser: null,
  SetToken: null,
  Logout: null,
});

const state = {
  user: {},
  token: "",
};

const mutations = {
  [types.SetUser](state, { user }) {
    state.user = user;
  },
  [types.SetToken](state, { token }) {
    state.token = token;
  },
  [types.Logout](state) {
    state.user = {};
    state.token = "";
  },
};

const actions = {
  async wxMpLogin({ commit }, { code, store = true }) {
    const { user, token } = await publicUsersApi.post({
      action: "wxMpLogin",
      body: { code },
    });

    if (store) {
      commit(types.SetUser, { user });
      commit(types.SetToken, { token });
    }

    return { user, token };
  },
  async wxLogin(
    { commit },
    { loginType = "Mp", code, iv, encryptedData, store = true }
  ) {
    const { user, token } = await publicUsersApi.post({
      action: "wxLogin",
      body: { loginType, code, iv, encryptedData },
    });

    if (store) {
      commit(types.SetUser, { user });
      commit(types.SetToken, { token });
    }

    return { user, token };
  },
  async accountRegister(
    { commit },
    { name, nickName, phoneNumber, captcha, password }
  ) {
    const { user, token } = await publicUsersApi.post({
      action: "accountRegister",
      body: { name, nickName, phoneNumber, captcha, password },
    });
    commit(types.SetUser, { user });
    commit(types.SetToken, { token });
    return { user, token };
  },
  async accountLogin({ commit }, { account, password }) {
    const { user, token } = await publicUsersApi.post({
      action: "accountLogin",
      body: { account, password },
    });
    commit(types.SetUser, { user });
    commit(types.SetToken, { token });
    return { user, token };
  },
  async setUser({ commit }, { user }) {
    commit(types.SetUser, { user });
    return { user };
  },
  async setToken({ commit }, { token }) {
    commit(types.SetToken, { token });
    return { token };
  },
  logout({ commit }) {
    commit(types.Logout);
    return null;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
