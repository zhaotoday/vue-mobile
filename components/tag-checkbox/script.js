import { Component, Vue } from "vue-property-decorator";

@Component({
  props: {
    checkable: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: () => []
    },
    maxCount: {
      type: Number,
      default: 0
    }
  }
})
export default class TagCheckbox extends Vue {
  checkedValues = [];

  check(item) {
    if (!this.checkable) {
      return;
    }
    if (!this.checkedValues.includes(item.value)) {
      if (this.maxCount > 0 && this.checkedValues.length >= this.maxCount) {
        this.$emit("exceeded-count");
      } else {
        this.checkedValues.push(item.value);
      }
    } else {
      const index = this.checkedValues.indexOf(item.value);
      this.checkedValues.splice(index, 1);
    }
    this.$emit("change", this.checkedValues);
  }
}
