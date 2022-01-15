const { wxUser, token } = require("@/mock/wx-user.json");

export const useMockWxUser = ({ store }) => {
  const login = () => {
    store.commit("wxUsers/SetWxUser", wxUser);
    store.commit("wxUsers/SetToken", `Bearer ${token}`);
    return { wxUser, token };
  };

  return {
    login,
  };
};
