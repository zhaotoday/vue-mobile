export default {
  name: "CTabs",
  props: {
    tabs: {
      type: Array,
      default: () => [],
    },
    index: {
      type: Number,
      default: 0,
    },
  },
};
