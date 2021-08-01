import helpers from "jt-helpers";
import { PublicUsersApi } from "../../apis/public/users";
import { UsersApi } from "../../apis/client/users";

const state = {
  user: {},
  token: "",
  openId: "",
};

const types = helpers.keyMirror({
  SetWxUser: null,
  SetToken: null,
  SetOpenId: null,
});

const mutations = {
  [types.SetWxUser](state, user) {
    state.user = user;
  },
  [types.SetToken](state, token) {
    state.token = token;
  },
  [types.SetOpenId](state, openId) {
    state.openId = openId;
  },
};

const actions = {
  async login({ commit }, { code, iv, encryptedData }) {
    const { user, token } = await new PublicUsersApi().POST({
      showLoading: true,
      action: "login",
      body: { type: "Mp", code, iv, encryptedData },
    });
    commit(types.SetWxUser, user);
    commit(types.SetToken, `Bearer ${token}`);
    return { user, token };
  },
  async mpLogin({ commit }, { code, iv, encryptedData }) {
    const { user, token } = await new PublicUsersApi().POST({
      showLoading: true,
      action: "mpLogin",
      body: { code, iv, encryptedData },
    });
    commit(types.SetWxUser, user);
    commit(types.SetToken, `Bearer ${token}`);
    return { user, token };
  },
  async oaLogin({ commit }, { code }) {
    const { user, token } = await new PublicUsersApi().POST({
      showLoading: true,
      action: "oaLogin",
      body: { code },
    });
    commit(types.SetWxUser, user);
    commit(types.SetToken, `Bearer ${token}`);
    return { user, token };
  },
  async appLogin({ commit }, { accessToken, openId }) {
    const { user, token } = await new PublicUsersApi().POST({
      showLoading: true,
      action: "appLogin",
      body: { accessToken, openId },
    });
    commit(types.SetWxUser, user);
    commit(types.SetToken, `Bearer ${token}`);
    return { user, token };
  },
  async getWxUser({ commit }) {
    const res = await new UsersApi().POST({
      action: "getUserInfo",
    });
    commit(types.SetWxUser, res);
    return res;
  },
  async getOpenId({ commit }, { code }) {
    const { openId } = await new PublicUsersApi().POST({
      showError: false,
      action: "getOpenId",
      body: { code },
    });
    commit(types.SetOpenId, openId);
    return openId;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
