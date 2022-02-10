import { useValidators } from "vue-validation";

export default {
  props: {
    value: [String, Number],
    placeholder: {
      type: String,
      default: "请选择",
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
