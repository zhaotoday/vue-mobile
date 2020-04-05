import { Vue, Component } from "vue-property-decorator";

@Component({
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  }
})
export default class ShareOptions extends Vue {
  onShareAppMessage() {
    return {
      title: this.$consts.Name,
      imageUrl: "",
      path: `/pages/home/index?shareOpenId=${this.$auth.getOpenId()}`
    };
  }
}
