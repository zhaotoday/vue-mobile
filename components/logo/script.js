import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Logo extends Vue {
  @Prop({
    type: String,
    default: ""
  })
  name;

  @Prop({
    type: Number,
    default: 0
  })
  width;

  @Prop({
    type: Number,
    default: 0
  })
  height;

  get widthModifier() {
    return this.width ? `w${this.width}` : "";
  }

  get heightModifier() {
    return this.height ? `h${this.height}` : "";
  }
}
