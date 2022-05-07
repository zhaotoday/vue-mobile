import wx from "wx-bridge";
import { reactive, ref } from "@vue/composition-api";
import { usersApi } from "../../../../apis/client/users";
import { useUsers } from "../../../../composables/use-users";
import { useHelpers } from "../../../../composables/use-helpers";

export default {
  setup() {
    const token = ref("");

    const { getUserInfo } = useUsers();

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

        await getUserInfo({ headers });
        wx.showToast({ title: "登陆成功" });
        await useHelpers().sleep(1500);
      }

      wx.navigateBack();
    };

    return {
      cModal,
      show,
      onGetPhoneNumber,
    };
  },
};
