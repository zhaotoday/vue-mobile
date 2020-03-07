import { Vue, Component } from "vue-property-decorator";

@Component({
  props: {
    items: {
      type: Array,
      default() {
        return [];
      }
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3000
    },
    height: {
      type: Number,
      default: 300
    }
  }
})
export default class Swiper extends Vue {
  current = 0;

  handleChange(e) {
    this.current = e.mp.detail.current;
  }
}
