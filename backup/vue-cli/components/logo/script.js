export default {
  name: "CLogo",
  props: {
    name: {
      type: String,
      default: "",
    },
    cssClasses: {
      type: Object,
      default: () => ({
        __icon: ["u-br22"],
      }),
    },
  },
};
