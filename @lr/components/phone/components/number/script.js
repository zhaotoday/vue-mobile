import wx from "wx-bridge";
import { reactive } from "@vue/composition-api";
import { usersApi } from "../../../../apis/client/users";
import { useUsers } from "../../../../composables/use-users";
import { useHelpers } from "../../../../composables/use-helpers";

export default {
  setup() {
    const { getUserInfo } = useUsers();

    const cModal = reactive({
      visible: false,
    });

    const show = () => {
      cModal.visible = true;
    };

    const onGetPhoneNumber = async (e) => {
      cModal.visible = false;

      if (e.detail.code) {
        await usersApi.post({
          action: "getWxPhoneNumber",
          body: { code: e.detail.code },
        });

        await getUserInfo();
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
