import { Component, Vue } from "vue-property-decorator";

@Component({
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    image: {
      type: String,
      default: ""
    }
  }
})
export default class Poster extends Vue {}
