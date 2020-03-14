import { Vue, Component } from "vue-property-decorator";

@Component({
  props: {
    name: {
      type: String,
      default: ""
    },
    width: {
      type: Number,
      default: ""
    },
    height: {
      type: Number,
      default: ""
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
