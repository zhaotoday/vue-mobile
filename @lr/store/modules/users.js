import helpers from "jt-helpers";
import { PublicUsersApi } from "../../apis/public/users";
import { UsersApi } from "../../apis/client/users";

const state = {
  user: {},
  token: "",
  openId: "",
};

const types = helpers.keyMirror({
  SetUser: null,
  SetToken: null,
  SetOpenId: null,
});

const mutations = {
  [types.SetUser](state, user) {
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
  async wxMpLogin({ commit }, { code, iv, encryptedData }) {
    const { user, token } = await new PublicUsersApi().post({
      showLoading: true,
      action: "wxMpLogin",
      body: { code, iv, encryptedData },
    });
    commit(types.SetUser, user);
    commit(types.SetToken, `Bearer ${token}`);
    return { user, token };
  },
  async oaLogin({ commit }, { code }) {
    const { user, token } = await new PublicUsersApi().post({
      showLoading: true,
      action: "oaLogin",
      body: { code },
    });
    commit(types.SetUser, user);
    commit(types.SetToken, `Bearer ${token}`);
    return { user, token };
  },
  async appLogin({ commit }, { accessToken, openId }) {
    const { user, token } = await new PublicUsersApi().post({
      showLoading: true,
      action: "appLogin",
      body: { accessToken, openId },
    });
    commit(types.SetUser, user);
    commit(types.SetToken, `Bearer ${token}`);
    return { user, token };
  },
  async getWxUser({ commit }) {
    const res = await new UsersApi().post({
      action: "getUserInfo",
    });
    commit(types.SetUser, res);
    return res;
  },
  async getOpenId({ commit }, { code }) {
    const { openId } = await new PublicUsersApi().post({
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
