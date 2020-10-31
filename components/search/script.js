import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class Search extends Vue {
  @Prop({
    type: Boolean,
    default: false
  })
  autoFocus;

  @Prop({
    type: Boolean,
    default: false
  })
  showSubmit;

  @Prop({
    type: String,
    default: ""
  })
  link;

  @Prop({
    type: String,
    default: ""
  })
  defaultValue;

  @Prop({
    type: String,
    default: ""
  })
  placeholder;

  value = "";

  @Watch("defaultValue")
  onDefaultValueChange(newVal) {
    this.value = newVal;
  }

  navigateToLink() {
    if (this.link) {
      this.$wx.navigateTo({ url: this.link });
    }
  }

  confirm() {
    this.$emit("confirm", this.value);
  }
}
