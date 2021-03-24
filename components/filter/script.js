export default {
  name: "CFilter",
  props: {
    placeholder: {
      type: String,
      default: "请选择"
    },
    range: {
      type: Array,
      default: () => []
    },
    value: {
      type: Number,
      default: -1
    }
  },
  setup(props, context) {
    const onChange = e => {
      context.emit("change", e);
    };

    return {
      onChange
    };
  }
};
