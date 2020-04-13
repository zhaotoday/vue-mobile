import { Component, Vue } from "vue-property-decorator";

@Component({
  props: {
    checked: {
      type: Boolean,
      default: false
    }
  }
})
export default class Checkbox extends Vue {}
