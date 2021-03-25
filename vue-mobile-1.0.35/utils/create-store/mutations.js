export default ({ types }) => {
  return {
    [types.GET_LIST](state, payload) {
      state.list = payload.data;
    },
    [types.GET_DETAIL](state, payload) {
      state.detail = payload.data;
    },
    [types.SET](state, { key, value }) {
      state[key] = value;
    }
  };
};
