import { Component, Vue } from "vue-property-decorator";

@Component({
  props: {
    name: {
      type: String,
      default: ""
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    }
  }
})
export default class Logo extends Vue {
  get widthModifier() {
    return this.width ? `w${this.width}` : "";
  }

  get heightModifier() {
    return this.height ? `h${this.height}` : "";
  }
}
