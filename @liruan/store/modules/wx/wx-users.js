import helpers from "jt-helpers";
import { WxUsersModel } from "../../../models/wx/wx-users";

const state = {
  data: {
    extra: {}
  },
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
    const {
      data: { wxUser, token, extra = {} }
    } = await new WxUsersModel().POST({
      showLoading: true,
      action: "login",
      body: { type: "Mp", code, iv, encryptedData }
    });
    commit(types.SetData, { ...wxUser, extra });
    commit(types.SetToken, token);
    return { wxUser, extra, token };
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
