import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Filter extends Vue {
  @Prop({
    type: String,
    default: "请选择"
  })
  placeholder;

  @Prop({
    type: Array,
    default: () => []
  })
  range;

  @Prop({
    type: Number,
    default: -1
  })
  value;

  handleChange(e) {
    this.$emit("change", e);
  }
}
