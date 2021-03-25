import helpers from "jt-helpers";
import { PublicWxUsersModel } from "../../../models/public/wx-users";
import { WxUsersModel } from "../../../models/wx/wx-users";

const state = {
  data: {},
  token: ""
};

const types = helpers.keyMirror({
  SetData: null,
  SetToken: null
});

const mutations = {
  [types.SetData](state, data) {
    state.data = data;
  },
  [types.SetToken](state, token) {
    state.token = token;
  }
};

const actions = {
  async login({ commit }, { code, iv, encryptedData }) {
    const { wxUser, token } = await new PublicWxUsersModel().POST({
      showLoading: true,
      action: "login",
      body: { type: "Mp", code, iv, encryptedData }
    });
    commit(types.SetData, wxUser);
    commit(types.SetToken, token);
    return { wxUser, token };
  },
  async get({ commit }) {
    const res = await new WxUsersModel().POST({
      action: "getUserInfo"
    });
    commit(types.SetData, res);
    return res;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
