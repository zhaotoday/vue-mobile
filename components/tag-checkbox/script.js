import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class TagCheckbox extends Vue {
  @Prop({
    type: Boolean,
    default: false
  })
  checkable;

  @Prop({
    type: Array,
    default: () => []
  })
  items;

  @Prop({
    type: Number,
    default: 0
  })
  maxCount;

  checkedValues = [];

  check(item) {
    if (!this.checkable) return;

    if (!this.checkedValues.includes(item.value)) {
      if (this.maxCount === 1) {
        this.checkedValues = [item.value];
      } else {
        if (this.maxCount > 0 && this.checkedValues.length >= this.maxCount) {
          this.$emit("exceeded-count");
        } else {
          this.checkedValues.push(item.value);
        }
      }
    } else {
      const index = this.checkedValues.indexOf(item.value);
      this.checkedValues.splice(index, 1);
    }
    this.$emit("change", this.checkedValues);
  }
}
