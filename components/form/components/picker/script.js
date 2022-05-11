import { useValidators } from "vue-validation";
import { computed } from "@vue/composition-api";

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
  setup(props, context) {
    const { validate } = useValidators();

    const defaultValue = computed(() => {
      const index = props.enums.findIndex((item) => item.value === props.value);
      return index === -1 ? 0 : index;
    });

    const onChange = (e) => {
      context.emit("input", props.enums[e.detail.value].value);
    };

    return {
      defaultValue,
      validate,
      onChange,
    };
  },
};
