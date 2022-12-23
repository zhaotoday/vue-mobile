export default {
  props: {
    customClass: [String, Object],
    src: String,
    mode: {
      type: String,
      default: "aspectFill",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: String,
    radius: String,
    errorText: String,
    emptyText: String,
  },
};
