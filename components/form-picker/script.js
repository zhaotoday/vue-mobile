import { useValidators } from "vue-validation";

export default {
  props: {
    placeholder: {
      type: String,
      default: "请输入",
    },
    enums: Array,
    customStyle: {
      type: [String, Object],
    },
    error: String,
  },
  setup(props, { parent }) {
    const { validate } = useValidators();

    return {
      prop: parent.prop,
      validate,
    };
  },
};
