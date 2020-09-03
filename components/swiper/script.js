import { Component, Vue } from "vue-property-decorator";

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
    previewable: {
      type: Boolean,
      default: false
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
export default class CSwiper extends Vue {
  current = 0;

  handleChange(e) {
    this.current = e.mp.detail.current;
  }

  handleClick(item) {
    if (this.previewable) {
      this.$wx.previewImage({
        urls: this.items.map(item => item.image),
        current: item.image,
        loop: true,
        indicator: "number"
      });
    } else {
      this.navigateTo(item.url);
    }
  }
}
