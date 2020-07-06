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
    }
  }
})
export default class Rate extends Vue {}
