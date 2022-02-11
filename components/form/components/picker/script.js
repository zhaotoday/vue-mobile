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
  emits: ["input"],
  setup(props, { emit, parent }) {
    const { validate } = useValidators();

    const onChange = (e) => {
      emit("input", props.enums[e.detail.value].value);
    };

    return {
      prop: parent.prop,
      validate,
      onChange,
    };
  },
};
