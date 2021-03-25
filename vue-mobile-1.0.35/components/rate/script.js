import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Rate extends Vue {
  @Prop({
    type: String,
    default: "sm"
  })
  modifier;

  @Prop({
    type: Number,
    default: 0
  })
  score;

  @Prop({
    type: String,
    default: "c37"
  })
  normalClass;

  @Prop({
    type: String,
    default: "c22"
  })
  activeClass;

  @Prop({
    type: Boolean,
    default: false
  })
  ratable;

  rate(score) {
    if (this.ratable) {
      this.$emit("change", score === this.score ? 0 : score);
    }
  }
}
