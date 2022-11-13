import { reactive } from "@vue/composition-api";
import { useHelpers } from "vue-mobile/@lr/composables/use-helpers";
import BForm from "./components/form";

export default {
  components: {
    BForm,
  },
  emits: ["cancel", "ok"],
  setup(props, context) {
    const cModal = reactive({
      visible: false,
    });

    const show = () => {
      cModal.visible = true;
    };

    const onCancel = () => {
      cModal.visible = false;
      context.emit("cancel");
    };

    const submit = async () => {
      await context.refs.formRef.submit(async () => {
        cModal.visible = false;

        uni.showToast({ title: "保存成功" });
        await useHelpers().sleep(1500);
        context.emit("ok");
      });
    };

    return {
      cModal,
      show,
      onCancel,
      submit,
    };
  },
};
