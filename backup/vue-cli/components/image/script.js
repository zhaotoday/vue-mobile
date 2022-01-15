import { computed } from "vue";

export default {
  name: "CImage",
  props: {
    src: String,
  },
  setup(props) {
    const html = computed(() => `<img src="${props.src}" />`);

    return {
      html,
    };
  },
};
