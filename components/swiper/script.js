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

  handleChange(e) {
    this.current = e.mp.detail.current;
  }

  goLink(url) {
    if (url.indexOf("https://") !== -1 || url.indexOf("http://") !== -1) {
      // #ifdef APP-PLUS
      plus.runtime.openWeb(url);
      // #endif
      // #ifdef H5
      window.location.href = url;
      // #endif
    } else {
      this.$wx.navigateTo({ url });
    }
  }
}
