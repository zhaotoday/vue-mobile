import helpers from "jt-helpers";
import { publicUsersApi } from "../../apis/public/users";

const types = helpers.keyMirror({
  SetUser: null,
  SetToken: null,
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
};

const actions = {
  async wxLogin({ commit }, { loginType = "Mp", code, iv, encryptedData }) {
    const { user, token } = await publicUsersApi.post({
      showLoading: true,
      action: "wxLogin",
      body: { loginType, code, iv, encryptedData },
    });
    commit(types.SetUser, { user });
    commit(types.SetToken, { token });
    return { user, token };
  },
  async accountRegister(
    { commit },
    { nickName, phoneNumber, captcha, password }
  ) {
    const { user, token } = await publicUsersApi.post({
      showLoading: true,
      action: "accountRegister",
      body: { nickName, phoneNumber, captcha, password },
    });
    commit(types.SetUser, { user });
    commit(types.SetToken, { token });
    return { user, token };
  },
  async accountLogin({ commit }, { account, password }) {
    const { user, token } = await publicUsersApi.post({
      showLoading: true,
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
  logout({ commit }) {
    commit(types.SetUser, { user: {} });
    commit(types.SetToken, { token: "" });
    return {};
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
