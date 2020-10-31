import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Checkbox extends Vue {
  @Prop({
    type: Boolean,
    default: false
  })
  checked;

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
}
