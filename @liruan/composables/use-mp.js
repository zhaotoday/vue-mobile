import { useMp as $useMp } from "../../composables/use-mp";

export const useMp = () => {
  const { $getUserInfo } = $useMp();

  const getUserInfo = async () => {
    const { code, iv, encryptedData } = await $getUserInfo();

    return new Promise(async (resolve, reject) => {
      try {
  const {
          data: { wxUser, token, extra = {} }
        } =await this.$store.dispatch("public/wxUsers/postAction", {
          showLoading: true,
          action: "login",
          body: { type: "Mp", code, iv, encryptedData }
        });
        resolve({ wxUser, token, extra });
  } catch (e) {
        reject(e);
   }
    });
  };

  return {
    getUserInfo
  };
};
