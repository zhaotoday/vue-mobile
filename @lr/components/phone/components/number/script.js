import { reactive, ref } from "@vue/composition-api";
import { usersApi } from "../../../../apis/client/users";
import { useUsers } from "../../../../composables/use-users";
import { useHelpers } from "../../../../composables/use-helpers";

export default {
  setup() {
    const token = ref("");

    const { getUserInfo, setToken } = useUsers();

    const cModal = reactive({
      visible: false,
    });

    const show = (options) => {
      token.value = options.token;
      cModal.visible = true;
    };

    const onGetPhoneNumber = async (e) => {
      cModal.visible = false;

      if (e.detail.code) {
        const headers = {
          Authorization: `Bearer ${token.value}`,
        };

        await usersApi.post({
          headers,
          action: "getWxPhoneNumber",
          body: { code: e.detail.code },
        });

        await setToken({ token: token.value });
        await getUserInfo({ headers });
        uni.showToast({ title: "登陆成功" });
        await useHelpers().sleep(1500);
      }

      uni.navigateBack();
    };

    return {
      cModal,
      show,
      onGetPhoneNumber,
    };
  },
};
