import { useValidators } from "vue-validation";

export default {
  props: {
    value: String,
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "请输入",
    },
    maxlength: {
      type: String,
      default: "140",
    },
    customStyle: {
      type: [String, Object],
    },
    error: String,
  },
  emits: ["input", "blur"],
  setup(props, { parent }) {
    const { validate } = useValidators();

    return {
      prop: parent.prop,
      validate,
    };
  },
};
