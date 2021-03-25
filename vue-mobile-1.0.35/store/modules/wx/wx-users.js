import createStore from "../../../utils/create-store";
import Model from "../../../models/wx/wx-users";

export default createStore({
  Model,
  state: {
    wxUser: {
      id: 0,
      name: "",
      nickName: "",
      avatarUrl: "",
      avatarId: null,
      phoneNumber: "",
      extra: {}
    }
  },
  types: {
    SET: null
  },
  mutations({ types }) {
    return {
      [types.SET](state, { key, value }) {
        state[key] = value;
      }
    };
  },
  actions({ types }) {
    return {
      set({ commit }, { key, value }) {
        commit(types.SET, { key, value });
      }
    };
  }
});
