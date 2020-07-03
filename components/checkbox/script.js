import { Component, Vue } from "vue-property-decorator";

@Component({
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    normalClass: {
      type: String,
      default: "c36"
    },
    checkedClass: {
      type: String,
      default: "c22"
    }
  }
})
export default class Checkbox extends Vue {}
