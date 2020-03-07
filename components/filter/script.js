import { Vue, Component } from "vue-property-decorator";

@Component({
  props: {
    placeholder: {
      type: String,
      default: ""
    },
    range: {
      type: Array,
      default: () => []
    },
    array: {
      type: Array,
      default: () => []
    },
    value: {
      type: Number,
      default: 0
    }
  }
})
export default class Filter extends Vue {
  handleChange(e) {
    this.$emit("change", e);
  }
}
