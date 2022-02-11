import { useValidators } from "vue-validation";

export default {
  props: {
    label: String,
    value: [String, Number],
    placeholder: {
      type: String,
      default: "请选择",
    },
    customStyle: {
      type: [String, Object],
    },
    error: String,
  },
  emits: ["click"],
  setup(props, { parent }) {
    const { validate } = useValidators();

    return {
      prop: parent.prop,
      validate,
    };
  },
};
