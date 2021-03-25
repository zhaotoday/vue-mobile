import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class CSwiper extends Vue {
  @Prop({
    type: Array,
    default: () => []
  })
  items;

  @Prop({
    type: Boolean,
    default: true
  })
  autoplay;

  @Prop({
    type: Boolean,
    default: false
  })
  previewable;

  @Prop({
    type: Number,
    default: 3000
  })
  interval;

  @Prop({
    type: Number,
    default: 750
  })
  width;

  @Prop({
    type: Number,
    default: 300
  })
  height;

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
