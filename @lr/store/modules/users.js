import helpers from "jt-helpers";
import { PublicUsersApi } from "../../apis/public/users";

const state = {
  user: {},
  token: "",
};

const types = helpers.keyMirror({
  SetUser: null,
  SetToken: null,
});

const mutations = {
  [types.SetUser](state, user) {
    state.user = user;
  },
  [types.SetToken](state, token) {
    state.token = token;
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
  async accountRegister({ commit }, { phoneNumber, captcha, password }) {
    const { user, token } = await new PublicUsersApi().post({
      showLoading: true,
      action: "accountRegister",
      body: { phoneNumber, captcha, password },
    });
    commit(types.SetUser, user);
    commit(types.SetToken, `Bearer ${token}`);
    return { user, token };
  },
  async accountLogin({ commit }, { account, password }) {
    const { user, token } = await new PublicUsersApi().post({
      showLoading: true,
      action: "accountLogin",
      body: { account, password },
    });
    commit(types.SetUser, user);
    commit(types.SetToken, `Bearer ${token}`);
    return { user, token };
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
