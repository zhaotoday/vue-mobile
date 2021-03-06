export default ({ types, Model }) => {
  return {
    async getList({ commit }, { showLoading, showError, query }) {
      const { data } = await new Model().GET({ showLoading, showError, query });
      commit(types.GET_LIST, { data });
      return data;
    },

    async getDetail({ commit }, { showLoading, showError, id, query }) {
      const { data } = await new Model().GET({
        showLoading,
        showError,
        id,
        query
      });
      commit(types.GET_DETAIL, { data });
      return data;
    },

    post({ commit }, { showLoading, showError, query, body }) {
      return new Model().POST({ showLoading, showError, query, body });
    },

    put({ commit }, { showLoading, showError, id, query, body }) {
      return new Model().PUT({ showLoading, showError, id, query, body });
    },

    delete({ commit }, { showLoading, showError, id }) {
      return new Model().DELETE({ showLoading, showError, id });
    },

    postAction(
      { commit },
      { showLoading, showError, action, id, query, body }
    ) {
      return new Model()
        .addPath(`${id ? id + "/" : ""}actions/${action}`)
        .POST({ showLoading, showError, query, body });
    },

    set({ commit }, { key, value }) {
      commit(types.SET, { key, value });
    }
  };
};
