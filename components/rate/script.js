import { Component, Vue } from "vue-property-decorator";

@Component({
  props: {
    modifier: {
      type: String,
      default: "sm"
    },
    score: {
      type: Number,
      default: 0
    },
    normalClass: {
      type: String,
      default: "c37"
    },
    activeClass: {
      type: String,
      default: "c22"
    },
    ratable: {
      type: Boolean,
      default: false
    }
  }
})
export default class Rate extends Vue {
  rate(score) {
    if (this.ratable) {
      this.$emit("change", score === this.score ? 0 : score);
    }
  }
}
