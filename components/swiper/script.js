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
    width: {
      type: Number,
      default: 750
    },
    height: {
      type: Number,
      default: 300
    }
  }
})
export default class Swiper extends Vue {
  current = 0;

  get style() {
    return {
      width: `${this.width}rpx`,
      height: `${this.height}rpx`
    };
  }

  handleChange(e) {
    this.current = e.mp.detail.current;
  }
}
