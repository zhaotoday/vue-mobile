import helpers from "jt-helpers";
import { PublicWxUsersModel } from "../../../models/public/wx-users";
import { WxUsersModel } from "../../../models/wx/wx-users";

const state = {
  wxUser: {},
  token: "",
  openId: "",
};

const types = helpers.keyMirror({
  SetWxUser: null,
  SetToken: null,
  SetOpenId: null,
});

const mutations = {
  [types.SetWxUser](state, wxUser) {
    state.wxUser = wxUser;
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
    const { wxUser, token } = await new PublicWxUsersModel().POST({
      showLoading: true,
      action: "login",
      body: { type: "Mp", code, iv, encryptedData },
    });
    commit(types.SetWxUser, wxUser);
    commit(types.SetToken, token);
    return { wxUser, token };
  },
  async getWxUser({ commit }) {
    const res = await new WxUsersModel().POST({
      action: "getUserInfo",
    });
    commit(types.SetWxUser, res);
    return res;
  },
  async getOpenId({ commit }, { code }) {
    const { openId } = await new PublicWxUsersModel().POST({
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
