import { reactive } from "@vue/composition-api";
import { usersApi } from "vue-mobile/@lr/apis/client/users";
import { useUsers } from "vue-mobile/@lr/composables/use-users";
import { useHelpers } from "vue-mobile/@lr/composables/use-helpers";

export default {
  emits: ["cancel", "ok"],
  setup(props, context) {
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

        cModal.visible = false;

        const { name } = await getUserInfo();

        await uni.showToast({ title: "绑定成功" });
        await useHelpers().sleep(1500);

        if (name) {
          context.emit("ok");
        } else {
          context.emit("show-user-info");
        }
      }
    };

    const onCancel = () => {
      cModal.visible = false;
      context.emit("cancel");
    };

    return {
      cModal,
      show,
      onGetPhoneNumber,
      onCancel,
    };
  },
};
