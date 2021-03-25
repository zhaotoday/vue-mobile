import helpers from 'jt-helpers'
import { WxWxUserModel } from "@/models/user";

const state = {
  token: "",
  data: {}
};

const types = helpers.keyMirror({
  SetInitData: null,
  SetToken: null,
  SetUser: null
});

const mutations = {
  [types.SetInitData](state, initData) {
    state.initData = initData;
  },
  [types.SetToken](state, token) {
    state.token = token;
  },
  [types.SetUser](state, user) {
    state.user = user;
  }
};

const actions = {
  async getInitData({ commit }) {
    const initData = await new CntUcModel().addPath("client/init").GET({});
    commit(types.SetInitData, initData);
    return initData;
  },
  async register({ commit }, body) {
    const { token } = await new CntUcModel().addPath("regedit").POST({ body });
    commit(types.SetToken, token);
    return token;
  },
  async login({ commit }, body) {
    const { token } = await new CntUcModel().addPath("login").POST({ body });
    commit(types.SetToken, token);
    return token;
  },
  logout({ commit }) {
    commit(types.SetToken, state.token);
    commit(types.SetUser, state.user);
    return null;
  },
  async getUser({ commit }) {
    const user = await new UserModel().addPath("userDetail").GET({});
    commit(types.SetUser, user);
    return user;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
