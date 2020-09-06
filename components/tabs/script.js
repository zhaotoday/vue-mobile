import { Component, Vue } from "vue-property-decorator";

@Component({
  props: {
    tabs: {
      type: Array,
      default: () => []
    },
    index: {
      type: Number,
      default: 0
    }
  }
})
export default class Tabs extends Vue {
  handleChange(index) {
    this.$emit("change", index);
  }
}
