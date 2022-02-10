export default {
  name: "CCheckbox",
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    normalClass: {
      type: String,
      default: "t-g7",
    },
    activeClass: {
      type: String,
      default: "t-primary",
    },
  },
};
